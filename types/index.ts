export interface CloudinaryUploadResultType {
  asset_id: string;
  public_id: string;
  version: number;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  url: string;
  secure_url: string;
  original_filename: string;
}
