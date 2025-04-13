import type { Route } from "./+types/sidebar";
import { Form, Link, NavLink, Outlet, useNavigation,useSubmit } from "react-router";
import { useEffect } from "react";

import { getContacts } from "../data";

export async function clientLoader({request}: Route.ClientLoaderArgs){
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    const contacts = await getContacts(q);
    return {contacts,q}
}


export default function Sidebar({loaderData}: Route.ComponentProps){
    const {contacts,q} = loaderData;
    const navigation = useNavigation();
    const submit = useSubmit();
    const contactElements = contacts.map((contact: any) => (
        <NavLink key={contact.id} to={`/contacts/${contact.id}`} className={({isActive}) => isActive ? "underline decoration-sky-500" : ""}>
            <li className="list-row pr-0">
                <div><img className="size-10 rounded-box" src={contact.avatar}/></div>
                <div>
                <div>{contact.first || contact.last ? `${contact.first} ${contact.last}` : contact.company}</div>
                <div className="text-xs font-semibold opacity-60">{contact.notes}</div>
                </div>
                <button className="btn btn-square btn-ghost">
                    <svg className="size-[1.2em]"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill={contact.favorite ? "bg-indigo-500" : "none"} stroke="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></g></svg>
                </button>
            </li>
        </NavLink>
    ));
    useEffect(() => {
        const searchField = document.getElementById("q");
        if(searchField instanceof HTMLInputElement){
            searchField.value = q || "";
        }
    },[q])

    return (
        <>
            <div id="sidebar" className="flex flex-col gap-2 w-72 h-screen overflow-hidden
                            bg-base-100 border-r-1 border-r-primary scheme-light-dark">
                <h1 className="order-1 ml-3  -mt-2 text-center text-primary"><Link className="ml-auto" to="about">React Router Contacts</Link></h1>
                <div id="search-form" className="flex gap-2 justify-around items-center pl-4 py-2 ">
                    <Form role="search" onChange={(event) => {
                        const isFirstSearch = q === null;
                        submit(event.currentTarget, {
                            replace: !isFirstSearch
                        }) 
                    }}>
                        <label className="input shadow-2xl">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
                            <input 
                                aria-label="Search contacts"
                                type="search" 
                                required 
                                placeholder="Search" 
                                id="q" 
                                name="q" 
                                defaultValue={q || ""}
                                />
                        </label>
                    </Form>
                    <Form method="post">
                        <button type="submit" className="btn btn-neutral size-10">New</button>
                    </Form>
                </div>
                <nav className="overflow-auto border-b-1 scroll-smooth">
                    <ul className="list bg-base-100 rounded-box shadow-md">
                        {contactElements}
                    </ul>
                </nav>
            </div>
            <div id="detail" className="flex-1 gap-5 mx-auto mt-5 w-full px-5">
                {navigation.state === "loading" ? (
                    <div className="flex w-52 gap-4">
                        <div className="skeleton h-32 w-full"></div>
                        <div className="flex flex-col gap-4">   
                            <div className="skeleton h-4 w-28"></div>
                            <div className="skeleton h-4 w-full"></div>
                            <div className="skeleton h-4 w-full"></div>
                        </div>
                  </div>
                ) : <Outlet/>}
            </div>
        </>
    )
}
