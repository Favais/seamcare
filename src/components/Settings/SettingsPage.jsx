"use client"
import { useState } from "react";
import { User, Lock, Bell, Palette, Save, Mail, Smartphone, Monitor } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Separator } from "../ui/separator";
import { toast } from "sonner";

export function SettingsPage() {
    const [theme, setTheme] = useState("light");
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [smsNotifications, setSmsNotifications] = useState(false);
    const [pushNotifications, setPushNotifications] = useState(true);

    // Account Info State
    const [accountInfo, setAccountInfo] = useState({
        firstName: "Sarah",
        lastName: "Wilson",
        email: "sarah.wilson@hospital.com",
        phone: "+1 (555) 123-4567",
        specialty: "Internal Medicine",
        licenseNumber: "MD-123456"
    });

    // Password State
    const [passwords, setPasswords] = useState({
        current: "",
        new: "",
        confirm: ""
    });

    const handleThemeToggle = (newTheme) => {
        setTheme(newTheme);
        if (newTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        toast.success(`Theme changed to ${newTheme} mode`);
    };

    const handleAccountSave = () => {
        // Mock save
        toast.success("Account information updated successfully");
    };

    const handlePasswordChange = () => {
        if (passwords.new !== passwords.confirm) {
            toast.error("New passwords do not match");
            return;
        }
        if (passwords.new.length < 8) {
            toast.error("Password must be at least 8 characters");
            return;
        }
        // Mock save
        toast.success("Password changed successfully");
        setPasswords({ current: "", new: "", confirm: "" });
    };

    const handleNotificationsSave = () => {
        // Mock save
        toast.success("Notification preferences updated");
    };

    return (
        <div className="p-6">
            <div className="mb-6">
                <h2 className="text-gray-900 mb-1">Settings</h2>
                <p className="text-gray-600">Manage your account settings and preferences</p>
            </div>

            <Tabs defaultValue="account" className="space-y-6 ">
                <TabsList className="grid w-full grid-cols-4 bg-gray-500/20`">
                    <TabsTrigger value="account" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Account
                    </TabsTrigger>
                    <TabsTrigger value="security" className="flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        Security
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="flex items-center gap-2">
                        <Bell className="h-4 w-4" />
                        Notifications
                    </TabsTrigger>
                    <TabsTrigger value="appearance" className="flex items-center gap-2">
                        <Palette className="h-4 w-4" />
                        Appearance
                    </TabsTrigger>
                </TabsList>

                {/* Account Tab */}
                <TabsContent value="account">
                    <Card>
                        <CardHeader>
                            <CardTitle>Account Information</CardTitle>
                            <CardDescription>
                                Update your personal information and professional details
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input
                                        id="firstName"
                                        value={accountInfo.firstName}
                                        onChange={(e) => setAccountInfo({ ...accountInfo, firstName: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input
                                        id="lastName"
                                        value={accountInfo.lastName}
                                        onChange={(e) => setAccountInfo({ ...accountInfo, lastName: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={accountInfo.email}
                                    onChange={(e) => setAccountInfo({ ...accountInfo, email: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    value={accountInfo.phone}
                                    onChange={(e) => setAccountInfo({ ...accountInfo, phone: e.target.value })}
                                />
                            </div>

                            <Separator />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="specialty">Medical Specialty</Label>
                                    <Input
                                        id="specialty"
                                        value={accountInfo.specialty}
                                        onChange={(e) => setAccountInfo({ ...accountInfo, specialty: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="license">License Number</Label>
                                    <Input
                                        id="license"
                                        value={accountInfo.licenseNumber}
                                        onChange={(e) => setAccountInfo({ ...accountInfo, licenseNumber: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <Button onClick={handleAccountSave}>
                                    <Save className="h-4 w-4 mr-2" />
                                    Save Changes
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Security Tab */}
                <TabsContent value="security">
                    <Card>
                        <CardHeader>
                            <CardTitle>Change Password</CardTitle>
                            <CardDescription>
                                Update your password to keep your account secure
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="currentPassword">Current Password</Label>
                                <Input
                                    id="currentPassword"
                                    type="password"
                                    value={passwords.current}
                                    onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                                    placeholder="Enter current password"
                                />
                            </div>

                            <Separator />

                            <div className="space-y-2">
                                <Label htmlFor="newPassword">New Password</Label>
                                <Input
                                    id="newPassword"
                                    type="password"
                                    value={passwords.new}
                                    onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                                    placeholder="Enter new password"
                                />
                                <p className="text-sm text-gray-500">
                                    Password must be at least 8 characters long
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    value={passwords.confirm}
                                    onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                                    placeholder="Confirm new password"
                                />
                            </div>

                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <h4 className="text-blue-900 mb-2 flex items-center gap-2">
                                    <Lock className="h-4 w-4" />
                                    Password Requirements
                                </h4>
                                <ul className="text-sm text-blue-700 space-y-1 ml-6 list-disc">
                                    <li>At least 8 characters long</li>
                                    <li>Contains uppercase and lowercase letters</li>
                                    <li>Contains at least one number</li>
                                    <li>Contains at least one special character</li>
                                </ul>
                            </div>

                            <div className="flex justify-end pt-4">
                                <Button onClick={handlePasswordChange}>
                                    <Lock className="h-4 w-4 mr-2" />
                                    Change Password
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Notifications Tab */}
                <TabsContent value="notifications">
                    <Card>
                        <CardHeader>
                            <CardTitle>Notification Preferences</CardTitle>
                            <CardDescription>
                                Choose how you want to receive notifications
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                {/* Email Notifications */}
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-100 rounded-lg">
                                            <Mail className="h-4 w-4 text-blue-600" />
                                        </div>
                                        <div>
                                            <h4 className="text-gray-900">Email Notifications</h4>
                                            <p className="text-sm text-gray-600">
                                                Receive notifications via email
                                            </p>
                                        </div>
                                    </div>
                                    <Switch
                                        checked={emailNotifications}
                                        onCheckedChange={setEmailNotifications}
                                    />
                                </div>

                                {/* SMS Notifications */}
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-green-100 rounded-lg">
                                            <Smartphone className="h-4 w-4 text-green-600" />
                                        </div>
                                        <div>
                                            <h4 className="text-gray-900">SMS Notifications</h4>
                                            <p className="text-sm text-gray-600">
                                                Receive notifications via text message
                                            </p>
                                        </div>
                                    </div>
                                    <Switch
                                        checked={smsNotifications}
                                        onCheckedChange={setSmsNotifications}
                                    />
                                </div>

                                {/* Push Notifications */}
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-purple-100 rounded-lg">
                                            <Bell className="h-4 w-4 text-purple-600" />
                                        </div>
                                        <div>
                                            <h4 className="text-gray-900">Push Notifications</h4>
                                            <p className="text-sm text-gray-600">
                                                Receive browser push notifications
                                            </p>
                                        </div>
                                    </div>
                                    <Switch
                                        checked={pushNotifications}
                                        onCheckedChange={setPushNotifications}
                                    />
                                </div>
                            </div>

                            <Separator />

                            <div>
                                <h4 className="text-gray-900 mb-3">Notification Types</h4>
                                <div className="space-y-3">
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="rounded" defaultChecked />
                                        <span className="text-sm text-gray-700">New patient appointments</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="rounded" defaultChecked />
                                        <span className="text-sm text-gray-700">Patient messages</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="rounded" defaultChecked />
                                        <span className="text-sm text-gray-700">Lab results ready</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="rounded" />
                                        <span className="text-sm text-gray-700">System updates</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="rounded" />
                                        <span className="text-sm text-gray-700">Marketing emails</span>
                                    </label>
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <Button onClick={handleNotificationsSave}>
                                    <Save className="h-4 w-4 mr-2" />
                                    Save Preferences
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Appearance Tab */}
                <TabsContent value="appearance">
                    <Card>
                        <CardHeader>
                            <CardTitle>Appearance Settings</CardTitle>
                            <CardDescription>
                                Customize how the application looks and feels
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <h4 className="text-gray-900 mb-4">Theme</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Light Mode */}
                                    <button
                                        onClick={() => handleThemeToggle("light")}
                                        className={`p-4 border-2 rounded-lg transition-all ${theme === "light"
                                            ? "border-blue-600 bg-blue-50"
                                            : "border-gray-200 hover:border-gray-300"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="p-2 bg-yellow-100 rounded-lg">
                                                <Monitor className="h-5 w-5 text-yellow-600" />
                                            </div>
                                            <div className="text-left">
                                                <h4 className="text-gray-900">Light Mode</h4>
                                                <p className="text-sm text-gray-600">Clean and bright interface</p>
                                            </div>
                                        </div>
                                        <div className="bg-white border border-gray-200 rounded-lg p-3 space-y-2">
                                            <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                                            <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                                            <div className="h-2 bg-blue-500 rounded w-1/4"></div>
                                        </div>
                                    </button>

                                    {/* Dark Mode */}
                                    <button
                                        onClick={() => handleThemeToggle("dark")}
                                        className={`p-4 border-2 rounded-lg transition-all ${theme === "dark"
                                            ? "border-blue-600 bg-blue-50"
                                            : "border-gray-200 hover:border-gray-300"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="p-2 bg-slate-700 rounded-lg">
                                                <Monitor className="h-5 w-5 text-slate-300" />
                                            </div>
                                            <div className="text-left">
                                                <h4 className="text-gray-900">Dark Mode</h4>
                                                <p className="text-sm text-gray-600">Easy on the eyes</p>
                                            </div>
                                        </div>
                                        <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 space-y-2">
                                            <div className="h-2 bg-slate-700 rounded w-3/4"></div>
                                            <div className="h-2 bg-slate-700 rounded w-1/2"></div>
                                            <div className="h-2 bg-blue-500 rounded w-1/4"></div>
                                        </div>
                                    </button>
                                </div>
                            </div>

                            <Separator />

                            <div>
                                <h4 className="text-gray-900 mb-4">Display Options</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-900">Compact Mode</p>
                                            <p className="text-sm text-gray-600">Reduce spacing and padding</p>
                                        </div>
                                        <Switch />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-900">Show Avatars</p>
                                            <p className="text-sm text-gray-600">Display patient profile pictures</p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-900">High Contrast</p>
                                            <p className="text-sm text-gray-600">Increase contrast for better readability</p>
                                        </div>
                                        <Switch />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}