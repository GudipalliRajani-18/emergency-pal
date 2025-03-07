
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ChevronLeft, Save, Edit2, LockIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MedicalInfo {
  name: string;
  dateOfBirth: string;
  bloodType: string;
  weight: string;
  height: string;
  allergies: string;
  medications: string;
  conditions: string;
  emergencyContact: string;
  emergencyPhone: string;
  notes: string;
  showOnLockScreen: boolean;
}

const bloodTypeOptions = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Unknown"];

const MedicalID = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [medicalInfo, setMedicalInfo] = useState<MedicalInfo>({
    name: "",
    dateOfBirth: "",
    bloodType: "",
    weight: "",
    height: "",
    allergies: "",
    medications: "",
    conditions: "",
    emergencyContact: "",
    emergencyPhone: "",
    notes: "",
    showOnLockScreen: true
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedInfo = localStorage.getItem("medicalInfo");
    if (savedInfo) {
      try {
        setMedicalInfo(JSON.parse(savedInfo));
      } catch (error) {
        console.error("Error parsing saved medical info", error);
      }
    }
  }, []);

  const handleChange = (field: keyof MedicalInfo, value: string | boolean) => {
    setMedicalInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    localStorage.setItem("medicalInfo", JSON.stringify(medicalInfo));
    setIsEditing(false);
    toast.success("Medical information saved successfully");
  };

  return (
    <div className="min-h-screen max-w-4xl mx-auto px-4 py-8 flex flex-col">
      <header className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-semibold">Medical ID</h1>
        </div>
        
        <Button
          variant={isEditing ? "default" : "outline"}
          size="sm"
          className="rounded-full gap-2"
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
        >
          {isEditing ? (
            <>
              <Save className="h-4 w-4" />
              Save
            </>
          ) : (
            <>
              <Edit2 className="h-4 w-4" />
              Edit
            </>
          )}
        </Button>
      </header>

      <ScrollArea className="flex-1 pr-4">
        <motion.div layout className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-primary/10 text-primary rounded-full p-2">
              <LockIcon className="h-6 w-6" />
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="lock-screen" className="font-medium">Show on lock screen</Label>
              <Switch
                id="lock-screen"
                checked={medicalInfo.showOnLockScreen}
                onCheckedChange={(checked) => handleChange("showOnLockScreen", checked)}
                disabled={!isEditing}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={medicalInfo.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  disabled={!isEditing}
                  className="rounded-lg h-11"
                />
              </div>
              
              <div>
                <Label htmlFor="dob">Date of Birth</Label>
                <Input
                  id="dob"
                  type="date"
                  value={medicalInfo.dateOfBirth}
                  onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                  disabled={!isEditing}
                  className="rounded-lg h-11"
                />
              </div>
              
              <div>
                <Label htmlFor="bloodType">Blood Type</Label>
                <Select
                  value={medicalInfo.bloodType}
                  onValueChange={(value) => handleChange("bloodType", value)}
                  disabled={!isEditing}
                >
                  <SelectTrigger className="rounded-lg h-11">
                    <SelectValue placeholder="Select blood type" />
                  </SelectTrigger>
                  <SelectContent>
                    {bloodTypeOptions.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={medicalInfo.weight}
                    onChange={(e) => handleChange("weight", e.target.value)}
                    disabled={!isEditing}
                    className="rounded-lg h-11"
                  />
                </div>
                
                <div>
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={medicalInfo.height}
                    onChange={(e) => handleChange("height", e.target.value)}
                    disabled={!isEditing}
                    className="rounded-lg h-11"
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="allergies">Allergies</Label>
                <Textarea
                  id="allergies"
                  value={medicalInfo.allergies}
                  onChange={(e) => handleChange("allergies", e.target.value)}
                  disabled={!isEditing}
                  className="rounded-lg min-h-[80px] resize-none"
                  placeholder="List any allergies"
                />
              </div>
              
              <div>
                <Label htmlFor="medications">Current Medications</Label>
                <Textarea
                  id="medications"
                  value={medicalInfo.medications}
                  onChange={(e) => handleChange("medications", e.target.value)}
                  disabled={!isEditing}
                  className="rounded-lg min-h-[80px] resize-none"
                  placeholder="List current medications"
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="conditions">Medical Conditions</Label>
              <Textarea
                id="conditions"
                value={medicalInfo.conditions}
                onChange={(e) => handleChange("conditions", e.target.value)}
                disabled={!isEditing}
                className="rounded-lg min-h-[100px] resize-none"
                placeholder="List any medical conditions"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
                <Input
                  id="emergencyContact"
                  value={medicalInfo.emergencyContact}
                  onChange={(e) => handleChange("emergencyContact", e.target.value)}
                  disabled={!isEditing}
                  className="rounded-lg h-11"
                />
              </div>
              
              <div>
                <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                <Input
                  id="emergencyPhone"
                  value={medicalInfo.emergencyPhone}
                  onChange={(e) => handleChange("emergencyPhone", e.target.value)}
                  disabled={!isEditing}
                  className="rounded-lg h-11"
                  type="tel"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                value={medicalInfo.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
                disabled={!isEditing}
                className="rounded-lg min-h-[100px] resize-none"
                placeholder="Any other important medical information"
              />
            </div>
          </div>
        </motion.div>
        
        <div className="text-xs text-muted-foreground mt-8 text-center">
          <p>Your medical information is stored locally on your device.</p>
          <p>This data is not uploaded to any server and remains private.</p>
        </div>
      </ScrollArea>
    </div>
  );
};

export default MedicalID;
