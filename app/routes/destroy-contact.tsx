import { deleteContact } from "../data";
import { redirect } from "react-router";
import type { Route } from "./+types/destroy-contact";

export async function clientAction({request,params}: Route.ClientActionArgs){
    await deleteContact(params.contactId);
    return redirect("/");
}