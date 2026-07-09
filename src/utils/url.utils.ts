import { api } from 'src/boot/axios';

const BASE_URL = process.env.API_URL ?? 'http://localhost:8080';

export function buildAvatarUrl(path: string | undefined | null): string | null {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  return `${BASE_URL}/uploads/${path}`;
}

export async function fetchAuthenticatedImage(
  path: string | null | undefined,
): Promise<string | null> {
  if (!path) return null;
  try {
    const url = buildAvatarUrl(path);
    const response = await api.get(url!, {
      responseType: 'blob', // ← recebe como blob
    });
    return URL.createObjectURL(response.data); // ← converte para URL local
  } catch {
    return null;
  }
}
