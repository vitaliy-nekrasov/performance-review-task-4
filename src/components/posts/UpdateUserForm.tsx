import React from "react";
import { useUpdateUserMutation } from "../../services/usersApi";
import UserForm from "./UserForm";

interface UpdateUserFormProps {
  id: number;
  initialValues: { name: string; job: string };
  onSuccess?: () => void;
}

const UpdateUserForm: React.FC<UpdateUserFormProps> = ({
  id,
  initialValues,
  onSuccess,
}) => {
  const [updateUser, { isLoading, isSuccess }] = useUpdateUserMutation();

  React.useEffect(() => {
    if (isSuccess && onSuccess) {
      onSuccess();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const handleUpdate = async ({ name, job }: { name: string; job: string }) => {
    await updateUser({ id, name, job, createdAt: "" });
  };

  return (
    <div>
      <UserForm
        onSubmit={handleUpdate}
        submitLabel={isLoading ? "Updating..." : "Update User"}
        initialValues={initialValues}
      />
    </div>
  );
};

export default UpdateUserForm;
