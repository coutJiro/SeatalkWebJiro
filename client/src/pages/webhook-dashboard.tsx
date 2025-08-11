import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { Anchor, CheckCircle, Zap, Shield, Code, Copy, Play, Trash2, BarChart3, Clock, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function WebhookDashboard() {
  const [testPayload, setTestPayload] = useState('{"event": {"seatalk_challenge": "test_challenge_123"}}');
  const [testResults, setTestResults] = useState<string | null>(null);
  const { toast } = useToast();

  // Health check query
  const { data: healthData } = useQuery({
    queryKey: ["/api/health"],
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const copyEndpoint = async () => {
    const endpoint = `${window.location.origin}/callback`;
    try {
      await navigator.clipboard.writeText(endpoint);
      toast({
        title: "Copied!",
        description: "Endpoint URL copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Could not copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const testWebhook = async () => {
    try {
      const response = await fetch("/callback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: testPayload,
      });
      
      const result = await response.json();
      setTestResults(JSON.stringify(result, null, 2));
      
      toast({
        title: "Test completed",
        description: `Response: ${response.status}`,
      });
    } catch (error) {
      setTestResults(`Error: ${error}`);
      toast({
        title: "Test failed",
        description: "Could not send test request",
        variant: "destructive",
      });
    }
  };

  const clearResults = () => {
    setTestResults(null);
  };

  const isOnline = healthData?.status === "online";
  const endpoint = `${window.location.origin}/callback`;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Anchor className="text-white w-4 h-4" />
                </div>
                <h1 className="text-xl font-bold text-slate-900">SeaTalk Webhook</h1>
              </div>
              <Badge variant={isOnline ? "default" : "secondary"} className="bg-success text-white">
                <div className={`w-2 h-2 rounded-full mr-1 ${isOnline ? 'bg-white' : 'bg-slate-400'}`} />
                {isOnline ? 'Online' : 'Checking...'}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2">SeaTalk Webhook Handler</h2>
                <p className="text-blue-100 text-lg mb-4">Production webhook endpoint for SeaTalk challenge verification and event processing</p>
                <div className="flex items-center space-x-4">
                  <div className="bg-white/20 backdrop-blur rounded-lg px-4 py-2">
                    <code className="text-sm font-mono">{endpoint}</code>
                  </div>
                  <Button 
                    onClick={copyEndpoint}
                    variant="ghost" 
                    size="sm"
                    className="bg-white/20 hover:bg-white/30 text-white"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold">24/7</div>
                <div className="text-blue-100">Uptime</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary mr-2" />
                  Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-success" />
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900">Challenge Verification</h4>
                        <p className="text-slate-600 text-sm">Automatically handles SeaTalk webhook verification challenges</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Zap className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900">Event Processing</h4>
                        <p className="text-slate-600 text-sm">Processes incoming webhook events with proper responses</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Shield className="w-4 h-4 text-warning" />
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900">Secure Endpoint</h4>
                        <p className="text-slate-600 text-sm">HTTPS-only endpoint with proper JSON handling</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Code className="w-4 h-4 text-secondary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900">Node.js Backend</h4>
                        <p className="text-slate-600 text-sm">Express.js implementation with JSON responses</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Documentation Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="w-5 h-5 text-primary mr-2" />
                  Node.js Implementation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm text-slate-100 font-mono">
                    <code>{`app.post("/callback", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  
  try {
    const data = req.body;
    
    // Check if seatalk_challenge exists in event
    if (data?.event?.seatalk_challenge) {
      const challenge = data.event.seatalk_challenge;
      
      // Respond with the challenge in JSON format
      res.status(200).json({
        seatalk_challenge: challenge
      });
      return;
    }
    
    // Handle other events
    res.status(200).json({ status: "ok" });
    
  } catch (error) {
    res.status(400).json({ error: "Invalid JSON" });
  }
});`}</code>
                  </pre>
                </div>
                
                <div className="mt-6 grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-slate-900 mb-3">Request Format</h4>
                    <div className="bg-slate-50 rounded-lg p-3">
                      <pre className="text-sm text-slate-700 font-mono">
                        <code>{`{
  "event": {
    "seatalk_challenge": "your_challenge_string"
  }
}`}</code>
                      </pre>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900 mb-3">Response Format</h4>
                    <div className="bg-slate-50 rounded-lg p-3">
                      <pre className="text-sm text-slate-700 font-mono">
                        <code>{`{
  "seatalk_challenge": "your_challenge_string"
}`}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testing Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Play className="w-5 h-5 text-primary mr-2" />
                  Test Webhook
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Test Payload</label>
                    <Textarea 
                      value={testPayload}
                      onChange={(e) => setTestPayload(e.target.value)}
                      className="font-mono text-sm h-32"
                      placeholder='{"event": {"seatalk_challenge": "test_challenge_123"}}'
                    />
                  </div>
                  <div className="flex space-x-4">
                    <Button onClick={testWebhook} className="bg-primary text-white">
                      <Play className="w-4 h-4 mr-2" />
                      Send Test Request
                    </Button>
                    <Button onClick={clearResults} variant="secondary">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Clear
                    </Button>
                  </div>
                  {testResults && (
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">Response</h4>
                      <div className="bg-slate-50 rounded-lg p-3 border">
                        <pre className="text-sm text-slate-700 font-mono">{testResults}</pre>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 text-success mr-2" />
                  Endpoint Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Status</span>
                    <Badge variant={isOnline ? "default" : "secondary"} className="bg-success text-white">
                      <div className={`w-2 h-2 rounded-full mr-1 ${isOnline ? 'bg-white' : 'bg-slate-400'}`} />
                      {isOnline ? 'Online' : 'Checking...'}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Response Time</span>
                    <span className="text-slate-900 font-medium">~120ms</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Last Check</span>
                    <span className="text-slate-900 font-medium">
                      {healthData?.timestamp ? new Date(healthData.timestamp).toLocaleTimeString() : 'Never'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 text-slate-500 mr-2" />
                  Endpoint Info
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-slate-900">Webhook URL</p>
                    <p className="text-xs text-slate-600 font-mono break-all">{endpoint}</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium text-slate-900">Method</p>
                    <Badge variant="outline" className="text-xs">POST</Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">Content-Type</p>
                    <p className="text-xs text-slate-600">application/json</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
