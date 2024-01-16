import { Box, Text } from "@chakra-ui/react";
import { AdminNavbar } from "../adminComponents/AdminNavbar";
import { UserManagement } from "../adminComponents/UserManagement";
import { BlockedUsers } from "../adminComponents/BlockedUsers";
import { ReviewManagement } from "../adminComponents/ReviewManagement";
export function AdminHome() {
  // let text = `<Text style="color:red">chal ja</Text>`
  return (
    <>
      <AdminNavbar />
      <Box padding={"0px 15px"}>
        <UserManagement />
      </Box>
    </>
  );
}
