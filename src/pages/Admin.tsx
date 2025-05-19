import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";

export default function Admin() {
  const [disableLightbox, setDisableLightbox] = useState(false);
  const [disableParameter, setDisableParameter] = useState('');
  const [showOnPageTransition, setShowOnPageTransition] = useState(true);
  const [showOnListingClick, setShowOnListingClick] = useState(true);

  useEffect(() => {
    // Load saved settings from localStorage
    const savedSettings = localStorage.getItem('lightboxSettings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setDisableLightbox(settings.disableLightbox);
      setDisableParameter(settings.disableParameter);
      setShowOnPageTransition(settings.showOnPageTransition);
      setShowOnListingClick(settings.showOnListingClick);
    }
  }, []);

  const saveSettings = () => {
    const settings = {
      disableLightbox,
      disableParameter,
      showOnPageTransition,
      showOnListingClick
    };
    localStorage.setItem('lightboxSettings', JSON.stringify(settings));
    
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
                    <Label htmlFor="disable-lightbox">Disable Loading Screen</Label>
                    <p className="text-sm text-gray-500">Turn the loading screen on or off globally</p>
                  </div>
                  <Switch 
                    id="disable-lightbox"
                    checked={disableLightbox}
                    onCheckedChange={setDisableLightbox}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="disable-parameter">Disable Parameter (URL keyword)</Label>
                  <Input 
                    id="disable-parameter"
                    placeholder="e.g., noloading"
                    value={disableParameter}
                    onChange={(e) => setDisableParameter(e.target.value)}
                  />
                  <p className="text-sm text-gray-500">
                    Loading screen will be disabled when URL contains this parameter
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-on-transition">Show on Page Transitions</Label>
                  <Switch 
                    id="show-on-transition"
                    checked={showOnPageTransition}
                    onCheckedChange={setShowOnPageTransition}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-on-listing">Show on Listing Clicks</Label>
                  <Switch 
                    id="show-on-listing"
                    checked={showOnListingClick}
                    onCheckedChange={setShowOnListingClick}
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
