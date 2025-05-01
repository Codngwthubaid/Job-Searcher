"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RecruiterLoginForm() {
    const [isLoginState, setIsLoginState] = useState("Login");
    const [isName, setIsName] = useState("");
    const [isEmail, setIsEmail] = useState("");
    const [isPassword, setIsPassword] = useState("");
    const [isImage, setIsImage] = useState(false);
    const [uploadedImage, setUploadedImage] = useState<File | null>(null);
    const [isDataSubmitted, setIsDataSubmitted] = useState(false);

    const onDrop = (acceptedFiles: File[]) => {
        setUploadedImage(acceptedFiles[0]);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "image/*": [] },
        multiple: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsDataSubmitted(true);
        const data = {
            name: isName,
            email: isEmail,
            password: isPassword,
            image: uploadedImage,
        };
        console.log(`${isLoginState} Data Submitted:`, data);
    };

    const toggleState = () => {
        setIsLoginState((prev) => (prev === "Login" ? "Sign Up" : "Login"));
        setIsDataSubmitted(false);
        setIsName("");
        setIsEmail("");
        setIsPassword("");
        setIsImage(false);
        setUploadedImage(null);
    };

    return (
        <div className="flex justify-center items-center">
            <Card className="w-full max-w-md p-6">
                <CardHeader>
                    <CardTitle className="text-2xl text-center">
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
                                        <Label>Upload Image</Label>
                                        <div
                                            {...getRootProps()}
                                            className="border-2 border-dashed border-gray-300 p-4 rounded-md text-center cursor-pointer bg-white"
                                        >
                                            <input {...getInputProps()} />
                                            {isDragActive ? (
                                                <p>Drop the image here ...</p>
                                            ) : (
                                                <p>
                                                    Drag & drop an image here, or click to select one
                                                </p>
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

                        <Button type="submit"
                            variant={"default"} className="w-full">
                            {isLoginState}
                        </Button>

                        <div className="text-center mt-2 text-sm">
                            {isLoginState === "Login"
                                ? "Don't have an account?"
                                : "Already have an account?"}{" "}
                            <Button
                                variant={"default"}
                                type="button"
                                onClick={toggleState}
                                className="text-blue-600 underline ml-1"
                            >
                                {isLoginState === "Login" ? "Sign Up" : "Login"}
                            </Button>
                        </div>
                    </form>

                    {isDataSubmitted && (
                        <p className="text-green-600 text-sm mt-4 text-center">
                            {isLoginState} form submitted successfully!
                        </p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
