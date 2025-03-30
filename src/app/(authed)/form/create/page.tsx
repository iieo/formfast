import Header from '@/components/common/header';

import CreateForm from './create-form';
import { getMaybeUser } from '@/auth/utilts';

export default async function Page() {
  const user = await getMaybeUser();

  return (
    <>
      <Header user={user} title="Create form" />
      <CreateForm />
    </>
  );
}
