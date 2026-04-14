import { UserProfile } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Header from "@/components/Header";

const TeacherProfilePage = () => {
  return (
    <>
      <Header title="Profile" subtitle="View your profile" />
      <UserProfile
        path="/teacher/profile"
        routing="path"
        appearance={{
          baseTheme: dark,
          elements: {
            navbar: {
              "& > div:nth-child(1)": {
                background: "none",
              },
            },
          },
        }}
      />
    </>
  );
};

export default TeacherProfilePage;
