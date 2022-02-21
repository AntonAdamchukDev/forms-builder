export function generateProfileIconUrl(id: number): string {
  return '../../assets/profile_images/' + String((id % 4) + 1) + '.png';
}
