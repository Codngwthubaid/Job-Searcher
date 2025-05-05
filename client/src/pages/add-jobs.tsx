import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useAppContext } from "@/Provider";
import { toast } from "sonner";
import { Loader } from "lucide-react";

type JobFormValues = {
    title: string;
    location: string;
    category: string;
    level: string;
    salary: string;
    description: string;
};

export default function AddJobs() {

    const { backendUrl, companyToken } = useAppContext()
    const [loading, setLoading] = useState(false)

    const [isSubmitting, setIsSubmitting] = useState(false);
    const form = useForm<JobFormValues>({
        mode: "onChange",
        defaultValues: {
            title: "",
            location: "",
            category: "",
            level: "",
            salary: "",
            description: "",
        },
    });


    const onSubmit = async (data: JobFormValues) => {
        setIsSubmitting(true);
        setLoading(true);

        try {
            const response = await axios.post(
                `${backendUrl}/company/postJob`,
                data,
                { headers: { Token: companyToken } }
            );
            if (response.data.success) {
                toast.success(response.data.message);
            }
        } catch (error: any) {
            toast.error(error.message || "An error occurred");
        } finally {
            setLoading(false);
            setIsSubmitting(false);
            form.reset();
        }
    };

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);


    return (
        loading ? (
            <div className="flex justify-center items-center h-full" >
                <Loader className="animate-spin text-blue-500 size-16" />
            </div>
        ) : (
            <div className="w-full overflow-y-auto h-full">
                <h2 className="text-2xl font-semibold mb-6">Post a New Job</h2>

                {/* <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="title"
                            rules={{ required: "Job title is required" }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Job Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. Frontend Developer" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            rules={{ required: "Description is required" }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Job Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Write the job description here..."
                                            className="min-h-[120px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex gap-x-10">
                            <FormField
                                control={form.control}
                                name="location"
                                rules={{ required: "Location is required" }}
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Location</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a location" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Bangalore">Bangalore</SelectItem>
                                                    <SelectItem value="Mumbai">Mumbai</SelectItem>
                                                    <SelectItem value="Delhi">Delhi</SelectItem>
                                                    <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                                                    <SelectItem value="Remote">Remote</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="category"
                                rules={{ required: "Category is required" }}
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Job Category</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Software Engineer">Software Engineer</SelectItem>
                                                    <SelectItem value="Marketing">Marketing</SelectItem>
                                                    <SelectItem value="Sales">Sales</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="level"
                                rules={{ required: "Level is required" }}
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Job Level</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a level" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Intern">Intern</SelectItem>
                                                    <SelectItem value="Junior">Junior</SelectItem>
                                                    <SelectItem value="Senior">Senior</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="salary"
                            rules={{ required: "Salary is required" }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Salary (Monthly in ₹)</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="e.g. 60000" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="w-full cursor-pointer bg-blue-500 hover:bg-blue-600"
                            disabled={!form.formState.isValid || isSubmitting}
                        >
                            {isSubmitting ? "Submitting..." : "Post Job"}
                        </Button>
                    </form>
                </Form> */}

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* Job Title */}
                        <FormField
                            control={form.control}
                            name="title"
                            rules={{ required: "Job title is required" }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Job Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. Frontend Developer" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Job Description */}
                        <FormField
                            control={form.control}
                            name="description"
                            rules={{ required: "Description is required" }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Job Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Write the job description here..."
                                            className="min-h-[120px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Responsive Group of Selects */}
                        <div className="flex flex-col gap-6 md:flex-row md:gap-4">
                            {/* Location */}
                            <FormField
                                control={form.control}
                                name="location"
                                rules={{ required: "Location is required" }}
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Location</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a location" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Bangalore">Bangalore</SelectItem>
                                                    <SelectItem value="Mumbai">Mumbai</SelectItem>
                                                    <SelectItem value="Delhi">Delhi</SelectItem>
                                                    <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                                                    <SelectItem value="Remote">Remote</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Category */}
                            <FormField
                                control={form.control}
                                name="category"
                                rules={{ required: "Category is required" }}
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Job Category</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Software Engineer">Software Engineer</SelectItem>
                                                    <SelectItem value="Marketing">Marketing</SelectItem>
                                                    <SelectItem value="Sales">Sales</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Level */}
                            <FormField
                                control={form.control}
                                name="level"
                                rules={{ required: "Level is required" }}
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Job Level</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a level" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Intern">Intern</SelectItem>
                                                    <SelectItem value="Junior">Junior</SelectItem>
                                                    <SelectItem value="Senior">Senior</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Salary */}
                        <FormField
                            control={form.control}
                            name="salary"
                            rules={{ required: "Salary is required" }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Salary (Monthly in ₹)</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="e.g. 60000" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full cursor-pointer bg-blue-500 hover:bg-blue-600"
                            disabled={!form.formState.isValid || isSubmitting}
                        >
                            {isSubmitting ? "Submitting..." : "Post Job"}
                        </Button>
                    </form>
                </Form>


            </div>
        )
    )
}
