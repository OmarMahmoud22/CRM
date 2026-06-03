import FormCreate from "./FormCreate";

export default function CreateLead() {
  return (
    <main className="min-h-screen bg-[#F2F4F6] px-4 py-8 font-inter sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-5xl items-center justify-center">
        <FormCreate />
      </div>
    </main>
  );
}
