
import { Form,  useFetcher } from "react-router";
import { getContact, updateContact, type ContactRecord } from "../data";
import type { Route } from "./+types/contact";

export async function clientLoader({request,params}: Route.ClientLoaderArgs){
    const contact = await getContact(params.contactId);
    if(!contact){
        throw new Response("", {status: 404});
    }
    return {contact};
}

export async function clientAction({request,params}: Route.ClientActionArgs){
    const formData = await request.formData();
    console.log(formData);
    return updateContact(params.contactId, {
        favorite: formData.get("favorite") === "true",
    });
}

export default function Contact({loaderData}: Route.ComponentProps){
    const {contact} = loaderData;
    return (
        <div className="card md:card-side bg-base-100 shadow-sm mx-auto w-5/6 max-w-5xl">
            <div className="avatar">
                <div className="w-48 rounded-2xl">
                    <img src={contact.avatar} />
                </div>
            </div>  
            <div className="card-body">
                <div className="flex justify-start gap-4">
                    <h2 className="card-title">{contact.first} {contact.last}</h2>
                    <Favorite contact={contact}/>
                </div>
                <p className="text-sm text-indigo-500">{contact.twitter}</p>
                <p >{contact.notes}</p>
                <div className="card-actions justify-start">
                    <Form action="edit">
                        <button type="submit" className="btn btn-primary">Edit</button>
                    </Form>
                    <Form method="post" action="destroy">
                        <button className="btn btn-secondary">Delete</button>
                    </Form>
                </div>
            </div>
        </div>
    )
}


function Favorite({contact}:{contact:Pick<ContactRecord, "favorite">}){
    const fetcher = useFetcher();
    const favorite = fetcher.formData?.get("favorite") === "true" ? true : fetcher.formData?.get("favorite") === "false" ? false : contact.favorite;
    return (
        <fetcher.Form method="post">  
            <button className="btn btn-circle" name="favorite" value={favorite ? "false" : "true"}>
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill={favorite ? "bg-indigo-500" : "none"} 
                    viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-[1.2em]"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
            </button>   
        </fetcher.Form>
    )
}