import Header from '@/components/common/header';
import { getUser } from '@/utils/auth';
import CreateForm from './create-form';

export default async function Page() {
  const user = await getUser();

  return (
    <>
      <Header user={user} title="Create form" />
      <CreateForm />
    </>
  );
}
