"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppContext } from "@/Provider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function RecruiterLoginForm() {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [isLoginState, setIsLoginState] = useState("Login");
    const [isName, setIsName] = useState("");
    const [isEmail, setIsEmail] = useState("");
    const [isPassword, setIsPassword] = useState("");
    const [isImage, setIsImage] = useState(false);
    const [uploadedImage, setUploadedImage] = useState<File | null>(null);
    const { backendUrl, setCompanyToken, setCompanyData } = useAppContext();

    const onDrop = (acceptedFiles: File[]) => {
        setUploadedImage(acceptedFiles[0]);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "image/*": [] },
        multiple: false,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (isLoginState === "Login") {
                const { data } = await axios.post(backendUrl + "/company/login", {
                    email: isEmail,
                    password: isPassword,
                });

                if (data.success) {
                    setCompanyData(data.company);
                    setCompanyToken(data.token);
                    localStorage.setItem("companyToken", data.token);

                    toast.success("Login successful! Redirecting...");
                    setTimeout(() => navigate('/dashboard'), 1000);
                } else {
                    toast.error(data.message || "Login failed");
                }
            }
            else {
                const formData = new FormData();
                formData.append("name", isName);
                formData.append("email", isEmail);
                formData.append("password", isPassword);
                if (uploadedImage) {
                    formData.append("image", uploadedImage);
                }

                const { data } = await axios.post(backendUrl + "/company/register", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })

                if (data.success) {
                    toast.success("Registration successful! Redirecting...");
                    setTimeout(() => navigate('/dashboard'), 1000);
                } else {
                    toast.error(data.message || "Registration failed");
                }
            }
        } catch (error: any) {
            console.error(error);
            toast.error(error.response?.data?.message || "Something went wrong!");
        } finally {
            setIsLoading(false);
        }
    };

    const toggleState = () => {
        setIsLoginState((prev) => (prev === "Login" ? "Sign Up" : "Login"));
        setIsName("");
        setIsEmail("");
        setIsPassword("");
        setIsImage(false);
        setUploadedImage(null);
    };

    return (
        <div className="flex justify-center items-center px-4 bg-linear-to-r from-blue-500 to-blue-600 rounded-lg py-5">
            <Card className="w-full max-w-md p-6 shadow-lg border border-gray-200">
                <CardHeader>
                    <CardTitle className="text-2xl text-center font-semibold">
                        {isLoginState === "Login" ? "Recruiter Login" : "Recruiter Sign Up"}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {isLoginState === "Sign Up" && (
                            <div>
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Enter your name"
                                    value={isName}
                                    onChange={(e) => setIsName(e.target.value)}
                                />
                            </div>
                        )}

                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={isEmail}
                                onChange={(e) => setIsEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={isPassword}
                                onChange={(e) => setIsPassword(e.target.value)}
                            />
                        </div>

                        {isLoginState === "Sign Up" && (
                            <>
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="image">Upload Image?</Label>
                                    <Switch
                                        id="image"
                                        checked={isImage}
                                        onCheckedChange={setIsImage}
                                    />
                                </div>

                                {isImage && (
                                    <div className="space-y-2">

                                        <div
                                            {...getRootProps()}
                                            className="border-2 border-dashed border-gray-300 p-4 rounded-md text-center cursor-pointer bg-white hover:bg-gray-100 transition"
                                        >
                                            <input {...getInputProps()} />
                                            {isDragActive ? (
                                                <p>Drop the image here ...</p>
                                            ) : (
                                                <p>Drag & drop an image here, or click to select</p>
                                            )}
                                        </div>
                                        {uploadedImage && (
                                            <p className="text-sm text-green-600">
                                                Selected: {uploadedImage.name}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </>
                        )}

                        <Button
                            type="submit"
                            variant="default"
                            className="w-full flex items-center justify-center"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                            ) : null}
                            {isLoginState}
                        </Button>

                        <div className="text-center mt-2 text-sm">
                            {isLoginState === "Login"
                                ? "Don't have an account?"
                                : "Already have an account?"}{" "}
                            <Button
                                variant="link"
                                type="button"
                                onClick={toggleState}
                                className="text-blue-600 hover:underline"
                            >
                                {isLoginState === "Login" ? "Sign Up" : "Login"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
