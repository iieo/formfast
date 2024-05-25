import { getUser } from '@/utils/auth';
export default async function ChatHome(context: unknown) {
  const user = await getUser();
  return <div>main</div>;
}
