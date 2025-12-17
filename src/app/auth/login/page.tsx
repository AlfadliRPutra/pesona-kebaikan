import { Box, Button, TextField, Typography } from "@mui/material";
import { signIn } from "@/lib/auth";

export default function LoginPage() {
  const signInAction = async (formData: FormData) => {
    "use server";
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    await signIn("credentials", { email, password, redirectTo: "/profil" });
  };

  return (
    <Box component="form" className="space-y-6" action={signInAction}>
      <div className="text-center">
        <Typography variant="h4" className="font-bold">
          Login
        </Typography>
        <Typography variant="body2" className="text-gray-500 mt-2">
          Masukkan kredensial Anda
        </Typography>
      </div>

      <div className="space-y-4">
        <TextField name="email" fullWidth label="Email" type="email" placeholder="you@example.com" />
        <TextField name="password" fullWidth label="Password" type="password" placeholder="••••••••" />
      </div>

      <Button type="submit" fullWidth variant="contained" size="large">
        Login
      </Button>
    </Box>
  );
}
