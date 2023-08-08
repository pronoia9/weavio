import { redirect } from 'next/navigation';
import Image from 'next/image';
import { currentUser } from '@clerk/nextjs';

import { profileTabs } from '@/constants';
import { ThreadsTab, ProfileHeader } from '@/components/shared';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';
import { fetchUser } from '@/lib/actions/user.actions';

const Page = async ({ params }: { params: { id: string } }) => {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(params.id);
  if (!userInfo?.onboarded) redirect('/onboarding');

  return (
    <section>
      <ProfileHeader
        accountId={userInfo.id}
        authUserId={user.id}
        name={userInfo.name}
        username={userInfo.username}
        imgUrl={userInfo.image}
        bio={userInfo.bio}
      />
    </section>
  );
};

export default Page;
