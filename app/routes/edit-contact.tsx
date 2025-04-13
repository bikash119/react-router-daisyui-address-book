import { Form ,redirect, useNavigate} from "react-router";
import type { Route } from "./+types/edit-contact";
import { getContact , updateContact} from "../data";

export async function clientLoader({params}: Route.ClientLoaderArgs){
    const contact = await getContact(params.contactId);
    if(!contact){
        throw new Response("", {status: 404});
    }
    return {contact};
}

export async function clientAction({request , params}: Route.ClientActionArgs){
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateContact(params.contactId, updates);
    return redirect(`/contacts/${params.contactId}`);
}

export default function EditContact({loaderData}: Route.ComponentProps){
    const {contact} = loaderData;
    const navigate = useNavigate();
    return (
        <Form className="flex flex-col gap-4 w-11/12 mx-auto rounded-lg p-4" key={contact.id} id="contact-form" method="post">
            <div className="flex gap-4">
                <label className="input">
                    <span className="label">First:</span>
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path></g></svg>
                    <input 
                        type="text" 
                        className="grow" 
                        placeholder="Joe" 
                        name="first"
                        defaultValue={contact.first}
                    />
                </label>
                <label className="input">
                    <span className="label">Last:</span>
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path></g></svg>
                    <input 
                        type="text" 
                        className="grow" 
                        placeholder="Doe" 
                        name="last"
                        defaultValue={contact.last}
                    />
                </label>
            </div>
            <label className="input validator">
                <span className="label">Twitter:</span>
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></g></svg>
                <input 
                    type="input" 
                    required 
                    placeholder="Username" 
                    pattern="[A-Za-z][A-Za-z0-9\-\@\_]*" 
                    minLength={3} 
                    maxLength={30} 
                    title="Only letters, numbers or dash" 
                    name="twitter"
                    defaultValue={contact.twitter}
                />
            </label>

            <label className="input validator">
                <span className="label">Avatar:</span>
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></g></svg>
                <input 
                    type="url" 
                    required 
                    placeholder="https://" 
                    value={contact.avatar? contact.avatar : "https://"} 
                    pattern="^(https?://)?([a-zA-Z0-9]([a-zA-Z0-9\-].*[a-zA-Z0-9])?\.)+[a-zA-Z].*$" 
                    title="Must be valid URL" 
                    name="avatar"
                />
            </label>
            <p className="validator-hint">Must be valid URL</p>
            <fieldset className="fieldset">
                <legend className="fieldset-legend">Notes</legend>
                <textarea className="textarea h-24" placeholder="Notes" name="notes">{contact.notes}</textarea>
                <div className="fieldset-label">Optional</div>
            </fieldset>
            <div className="flex gap-4">
                <button type="submit" className="btn btn-lg btn-primary">Save</button>
                <button className="btn btn-lg btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
            </div>
        </Form>

    )
}