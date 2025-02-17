import {
  MediaTypeObject,
  RequestBodyObject,
  ResponseObject,
} from "openapi3-ts";

/**
 * Returns the first compatible media type.
 *
 * @param requestBodyOrResponseObject
 * @returns
 */
export const findCompatibleMediaType = (
  requestBodyOrResponseObject: RequestBodyObject | ResponseObject
): (MediaTypeObject & { contentType: string }) | undefined => {
  if (!requestBodyOrResponseObject.content) return;
  for (let contentType of Object.keys(requestBodyOrResponseObject.content)) {
    if (
      contentType.startsWith("*/*") ||
      contentType.startsWith("application/json") ||
      contentType.startsWith("application/octet-stream") ||
      contentType.startsWith("multipart/form-data") ||
      contentType.startsWith("application/x-www-form-urlencoded")
    ) {
      return {
        ...requestBodyOrResponseObject.content[contentType],
        contentType,
      };
    }
  }
};
