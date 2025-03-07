
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, Users, SendIcon, PlusCircle, X, Bell } from "lucide-react";
import { Link } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

interface Contact {
  id: string;
  name: string;
  phone: string;
}

const Alerts = () => {
  const [contacts, setContacts] = useState<Contact[]>(() => {
    const saved = localStorage.getItem("emergencyContacts");
    return saved ? JSON.parse(saved) : [];
  });
  
  const [newContact, setNewContact] = useState({ name: "", phone: "" });
  const [showAddForm, setShowAddForm] = useState(false);
  const [message, setMessage] = useState(
    "I'm in an emergency situation and need help. This is my current location:"
  );
  
  const handleAddContact = () => {
    if (!newContact.name || !newContact.phone) {
      toast.error("Please enter both name and phone number");
      return;
    }
    
    const updatedContacts = [
      ...contacts, 
      { ...newContact, id: Date.now().toString() }
    ];
    
    setContacts(updatedContacts);
    localStorage.setItem("emergencyContacts", JSON.stringify(updatedContacts));
    
    setNewContact({ name: "", phone: "" });
    setShowAddForm(false);
    
    toast.success("Emergency contact added");
  };
  
  const handleRemoveContact = (id: string) => {
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    setContacts(updatedContacts);
    localStorage.setItem("emergencyContacts", JSON.stringify(updatedContacts));
    toast.success("Contact removed");
  };
  
  const sendAlerts = () => {
    if (contacts.length === 0) {
      toast.error("Please add at least one emergency contact");
      return;
    }
    
    // In a real app, this would send SMS messages with location data
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const locationLink = `https://maps.google.com/?q=${position.coords.latitude},${position.coords.longitude}`;
        const fullMessage = `${message} ${locationLink}`;
        
        toast.success("Emergency alerts sent to all contacts");
        console.log("Would send:", fullMessage);
        console.log("To contacts:", contacts);
      },
      (error) => {
        toast.error("Could not determine your location. Alerts may not include your position.");
        console.error("Geolocation error:", error);
      }
    );
  };

  return (
    <div className="min-h-screen max-w-4xl mx-auto px-4 py-8 flex flex-col">
      <header className="mb-6 flex items-center gap-2">
        <Link to="/">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-semibold">Emergency Alerts</h1>
      </header>

      <div className="grid grid-cols-1 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-sm border"
        >
          <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Emergency Contacts
          </h2>
          
          <ScrollArea className="pr-4 max-h-[300px]">
            {contacts.length > 0 ? (
              <div className="space-y-3">
                {contacts.map((contact) => (
                  <motion.div
                    key={contact.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{contact.name}</p>
                      <p className="text-sm text-muted-foreground">{contact.phone}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => handleRemoveContact(contact.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                <p>No emergency contacts added yet</p>
                <p className="text-sm">Add contacts who should be notified in case of emergency</p>
              </div>
            )}
          </ScrollArea>
          
          {showAddForm ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 space-y-3"
            >
              <Input
                placeholder="Contact Name"
                value={newContact.name}
                onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                className="rounded-lg"
              />
              <Input
                placeholder="Phone Number"
                value={newContact.phone}
                onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                type="tel"
                className="rounded-lg"
              />
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </Button>
                <Button className="flex-1" onClick={handleAddContact}>
                  Add Contact
                </Button>
              </div>
            </motion.div>
          ) : (
            <Button
              variant="outline"
              className="w-full mt-4 gap-2"
              onClick={() => setShowAddForm(true)}
            >
              <PlusCircle className="h-4 w-4" />
              Add Emergency Contact
            </Button>
          )}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-sm border"
        >
          <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Alert Message
          </h2>
          
          <div className="space-y-4">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full h-32 p-3 border rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Enter emergency message..."
            />
            
            <div className="text-sm text-muted-foreground">
              Your current location will be automatically added to this message.
            </div>
            
            <Button 
              size="lg" 
              className="w-full gap-2 bg-emergency hover:bg-emergency/90 text-white"
              onClick={sendAlerts}
            >
              <SendIcon className="h-4 w-4" />
              Send Emergency Alerts
            </Button>
          </div>
        </motion.div>
      </div>

      <div className="text-xs text-center text-muted-foreground mt-6">
        Emergency alerts will be sent as text messages to all your emergency contacts.
      </div>
    </div>
  );
};

export default Alerts;
