import { redirect } from "next/navigation";
import { defaultLocale } from "@/config/site";
// Español es el idioma por defecto: la raíz lleva a /es/
export default function Root() { redirect(`/${defaultLocale}/`); }
