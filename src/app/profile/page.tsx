"use client";

import dynamic from "next/dynamic";

const ProfileForm = dynamic(() => import("@/components/pages/profile/profileForm"), { ssr: false });

export default function ProfilePage() {
  return (
    <main className="flex flex-col items-center p-10 gap-8">
      <div className="flex gap-20 w-full justify-center">
        <div>
          <ProfileForm />
        </div>
      </div>
    </main>
  );
}