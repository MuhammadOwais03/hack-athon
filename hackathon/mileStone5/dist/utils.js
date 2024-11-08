import { v4 as uuidv4 } from 'uuid';
export function generateUniqueResumeUrl(username) {
    const uniqueId = uuidv4(); // Generate a unique identifier
    return `${window.location.origin}/resume/${username}/${uniqueId}`;
}
