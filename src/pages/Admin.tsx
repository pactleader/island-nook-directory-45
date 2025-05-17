
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";

export default function Admin() {
  const [urlParams, setUrlParams] = useState<string>("");
  const [isLightboxEnabled, setIsLightboxEnabled] = useState<boolean>(true);
  const [showOnDirectoryClickOnly, setShowOnDirectoryClickOnly] = useState<boolean>(true);
  
  // Load settings from localStorage on initial render
  useEffect(() => {
    const savedUrlParams = localStorage.getItem("lightbox_disable_params");
    const savedLightboxEnabled = localStorage.getItem("lightbox_enabled");
    const savedShowOnDirectoryOnly = localStorage.getItem("lightbox_directory_only");
    
    if (savedUrlParams) setUrlParams(savedUrlParams);
    if (savedLightboxEnabled !== null) setIsLightboxEnabled(savedLightboxEnabled === "true");
    if (savedShowOnDirectoryOnly !== null) setShowOnDirectoryClickOnly(savedShowOnDirectoryOnly === "true");
  }, []);

  // Save settings to localStorage
  const saveSettings = () => {
    localStorage.setItem("lightbox_disable_params", urlParams);
    localStorage.setItem("lightbox_enabled", String(isLightboxEnabled));
    localStorage.setItem("lightbox_directory_only", String(showOnDirectoryClickOnly));
    
    toast({
      title: "Settings Saved",
      description: "Your ad lightbox settings have been updated.",
    });
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <Tabs defaultValue="lightbox" className="w-full">
        <TabsList>
          <TabsTrigger value="lightbox">Ad Lightbox Settings</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>
        
        <TabsContent value="lightbox">
          <Card>
            <CardHeader>
              <CardTitle>Advertising Lightbox Configuration</CardTitle>
              <CardDescription>
                Configure when and how the advertisement lightbox appears to users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="lightbox-enabled">Enable Ad Lightbox</Label>
                    <p className="text-sm text-gray-500">Turn the ad lightbox on or off globally</p>
                  </div>
                  <Switch 
                    id="lightbox-enabled"
                    checked={isLightboxEnabled}
                    onCheckedChange={setIsLightboxEnabled}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="directory-only">Show On Directory Clicks Only</Label>
                    <p className="text-sm text-gray-500">Only show ads when users click on directory listings</p>
                  </div>
                  <Switch 
                    id="directory-only"
                    checked={showOnDirectoryClickOnly}
                    onCheckedChange={setShowOnDirectoryClickOnly}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="url-params">Disable Lightbox for These URL Parameters</Label>
                  <p className="text-sm text-gray-500">
                    Enter comma-separated parameters that will disable the ad lightbox when present in URL
                  </p>
                  <Input 
                    id="url-params"
                    placeholder="e.g., noad, admin, preview"
                    value={urlParams}
                    onChange={(e) => setUrlParams(e.target.value)}
                  />
                </div>
                
                <Button onClick={saveSettings} className="mt-4">
                  Save Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>Analytics functionality will be implemented in future updates.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Analytics dashboard coming soon.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>User management functionality will be implemented in future updates.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>User management dashboard coming soon.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
