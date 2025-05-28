import { SignOutButton } from "@clerk/nextjs";

export default async function Home() {
  return (
    <div>
      <div>Home</div>
      <SignOutButton />
    </div>
  );
}
