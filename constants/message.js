module.exports = {
  mongodb_msgs: {
    object_id: "Sorry! Invalid Objectid, Please Check Your Id then try agin!",
  },
  login_msgs: {
    error: "Invalid Email or Password!",
    success: "You are Login Successfully",
  },
  authorization_msgs: {
    privlage_error: "Sorry! Forbidden, Your Are Not Allowed to Access.",
    access_denied: "Sorry! Access Denied, Your Are Not Allowed to Access.",
  },
  auth_token_msgs: {
    invalid:
      "Sorry! Invalid Token, Your Are Not Allowed to Access before <Sign-in>.",
  },
  database_msgs: {
    success: "✔️ Database is Connected to Successfully.",
    error: "❌ Sorry!, Database Connection Faild."
  },
  server_msgs: {
    listening: (PORT, URL) => `✔️ Server is Running on PORT[${PORT}] | ${URL}:${PORT}`,
    mode: (MODE) => `✔️ Server is Running on Mode: ${MODE}`
  },
  messages: (moduleName) => {
    return {
      item_exists: `Sorry! ${moduleName} is already Exists`,
      create: `${moduleName} Created Successfully.`,
      create_error: `${moduleName} did Not Insert!`,
      update: `${moduleName} Update Successfully.`,
      update_error: `${moduleName} Did Not Update.`,
      not_found: `${moduleName} Not Found!`,
      delete: `Sorry! ${moduleName} Deleted Successfully.`,
      delete_error: `${moduleName} Did not Delete Successfully`,
    };
  },
};
