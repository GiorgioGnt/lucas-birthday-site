import { TableClient } from "@azure/data-tables";
import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";

type Attendance = "Yes" | "No";

type RsvpRequestBody = {
  attending?: unknown;
  className?: unknown;
  guestCount?: unknown;
  isUpdate?: unknown;
  kidName?: unknown;
  parentName?: unknown;
};

type ValidatedRsvp = {
  attending: Attendance;
  className: string;
  guestCount: string;
  isUpdate: boolean;
  kidName: string;
  parentName: string;
};

type RsvpEntity = ValidatedRsvp & {
  partitionKey: string;
  rowKey: string;
  source: "web";
  submittedAt: string;
};

const partitionKey = "lucas5";

function jsonResponse(status: number, body: unknown): HttpResponseInit {
  return {
    status,
    jsonBody: body,
  };
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isRecord(value: unknown): value is RsvpRequestBody {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeRowKeyPart(value: string): string {
  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return normalized || "unknown";
}

function createRowKey(rsvp: ValidatedRsvp, submittedAt: string): string {
  const timestamp = submittedAt.replace(/[^0-9]/g, "");
  const kidName = normalizeRowKeyPart(rsvp.kidName);
  const className = normalizeRowKeyPart(rsvp.className);

  return `${kidName}-${className}-${timestamp}`;
}

function validateRsvp(body: RsvpRequestBody): {
  errors: string[];
  value?: ValidatedRsvp;
} {
  const errors: string[] = [];
  const kidName = isString(body.kidName) ? body.kidName.trim() : "";
  const className = isString(body.className) ? body.className.trim() : "";
  const parentName = isString(body.parentName) ? body.parentName.trim() : "";
  const attending = isString(body.attending) ? body.attending.trim() : "";
  const guestCount = isString(body.guestCount) ? body.guestCount.trim() : "";

  if (!kidName) {
    errors.push("Kid name is required.");
  }

  if (!className) {
    errors.push("Class is required.");
  }

  if (attending !== "Yes" && attending !== "No") {
    errors.push('Attending is required and must be "Yes" or "No".');
  }

  if (attending === "Yes" && !guestCount) {
    errors.push("Number of people attending is required.");
  }

  if (typeof body.isUpdate !== "boolean") {
    errors.push("RSVP update selection is required.");
  }

  if (errors.length > 0) {
    return { errors };
  }

  return {
    errors,
    value: {
      attending: attending as Attendance,
      className,
      guestCount: attending === "Yes" ? guestCount : "",
      isUpdate: body.isUpdate as boolean,
      kidName,
      parentName,
    },
  };
}

function getTableClient(): TableClient {
  const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
  const tableName = process.env.RSVP_TABLE_NAME;

  if (!connectionString) {
    throw new Error("Missing AZURE_STORAGE_CONNECTION_STRING setting.");
  }

  if (!tableName) {
    throw new Error("Missing RSVP_TABLE_NAME setting.");
  }

  return TableClient.fromConnectionString(connectionString, tableName);
}

export async function rsvp(
  request: HttpRequest,
  context: InvocationContext,
): Promise<HttpResponseInit> {
  if (request.method !== "POST") {
    return jsonResponse(405, {
      error: "Method not allowed. Please use POST.",
    });
  }

  let body: RsvpRequestBody;

  try {
    const parsedBody = await request.json();

    if (!isRecord(parsedBody)) {
      return jsonResponse(400, {
        error: "JSON request body must be an object.",
      });
    }

    body = parsedBody;
  } catch {
    return jsonResponse(400, {
      error: "Invalid JSON request body.",
    });
  }

  const validation = validateRsvp(body);

  if (!validation.value) {
    return jsonResponse(400, {
      error: "Please check your RSVP details.",
      details: validation.errors,
    });
  }

  const submittedAt = new Date().toISOString();
  const entity: RsvpEntity = {
    ...validation.value,
    partitionKey,
    rowKey: createRowKey(validation.value, submittedAt),
    source: "web",
    submittedAt,
  };

  try {
    const tableClient = getTableClient();
    await tableClient.createEntity(entity);

    return jsonResponse(200, {
      success: true,
      message: "RSVP saved",
    });
  } catch (error) {
    context.error("Failed to save RSVP submission.", error);

    return jsonResponse(500, {
      error: "We could not save the RSVP right now. Please try again later.",
    });
  }
}

app.http("rsvp", {
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD"],
  authLevel: "anonymous",
  handler: rsvp,
});
