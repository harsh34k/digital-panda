"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import { z } from "zod"
import axios from "axios"
import { Modal } from "../ui/modal";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import toast from "react-hot-toast";

const formSchema = z.object({
    name: z.string().min(2).max(50),
})

export const StoreModal = () => {
    const storeModal = useStoreModal();
    const [loading, setLoading] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setLoading(true);
            console.log("values", values);

            const response = await axios.post("/api/store", values)
            console.log(response.data);
            window.location.assign(`/${response.data.id}`)
            toast.success("Store created")
        } catch (error) {
            toast.error("Something went wrong")
        }
        finally {
            setLoading(false)
        }
    }
    return (<>
        <Modal
            title="Create Store"
            description="Add your store to manage products and categories"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose} >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={loading} placeholder="Enter Your Project Name" {...field} />
                                </FormControl>
                                {/* <FormDescription>
                                    This is your public display name.
                                </FormDescription> */}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="space-x-2 flex items-center justify-end">
                        <Button disabled={loading} variant="outline"> Cancel</Button>
                        <Button disabled={loading} type="submit">Continue</Button>
                    </div>
                </form>
            </Form>
        </Modal>

    </>


    )
}