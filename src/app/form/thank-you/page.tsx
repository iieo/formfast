'use client';

export default async function Page() {
  return (
    <div className="flex flex-col items-center justify-center p-12 flex-grow overflow-y-auto">
      <div className="rounded bg-main-800 w-full max-w-[50rem] p-12  flex flex-col justify-center gap-2">
        <h3 className="text-white text-2xl text-center">Thank you!</h3>
        <p className="text-white text-lg  text-center">
          Your form has been submitted successfully.
        </p>
      </div>
    </div>
  );
}
