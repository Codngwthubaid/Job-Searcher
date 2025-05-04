import { useState } from "react";
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

type JobFormValues = {
    title: string;
    location: string;
    category: string;
    level: string;
    salary: string;
    description: string;
};

export default function AddJobs() {
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

    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (data: JobFormValues) => {
        setIsSubmitting(true);

        setTimeout(() => {
            console.log("Submitted Job:", data);

            form.reset();
            setIsSubmitting(false);
        }, 2000);
    };

    return (
        <div className="w-full">
            <h2 className="text-2xl font-semibold mb-6">Post a New Job</h2>

            <Form {...form}>
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
                        className="w-full"
                        disabled={!form.formState.isValid || isSubmitting}
                    >
                        {isSubmitting ? "Submitting..." : "Post Job"}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
