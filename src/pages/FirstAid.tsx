
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";

interface FirstAidItem {
  id: string;
  title: string;
  steps: string[];
  tags: string[];
}

const FIRST_AID_DATA: FirstAidItem[] = [
  {
    id: "cpr",
    title: "CPR (Cardiopulmonary Resuscitation)",
    tags: ["heart", "breathing", "unconscious"],
    steps: [
      "Check if the person is responsive by tapping their shoulder and shouting.",
      "If unresponsive, call emergency services (911) or ask someone else to call.",
      "Place the person on their back on a firm surface.",
      "Kneel beside the person's neck and shoulders.",
      "Place the heel of one hand on the center of the person's chest.",
      "Place your other hand on top of the first hand and interlock your fingers.",
      "Position your shoulders directly above your hands, keeping your arms straight.",
      "Push hard and fast at a rate of 100-120 compressions per minute, pressing down at least 2 inches.",
      "Allow the chest to completely recoil after each compression.",
      "Continue until help arrives or the person shows signs of life."
    ]
  },
  {
    id: "choking",
    title: "Choking",
    tags: ["airway", "breathing", "obstruction"],
    steps: [
      "Ask the person if they're choking. If they can't speak, cough, or breathe, proceed with assistance.",
      "Stand behind the person and slightly to one side.",
      "Support their chest with one hand and lean them forward.",
      "Give up to 5 sharp blows between their shoulder blades with the heel of your hand.",
      "Check if the obstruction has cleared after each blow.",
      "If back blows don't clear the obstruction, perform abdominal thrusts (Heimlich maneuver).",
      "Stand behind the person and put your arms around their waist.",
      "Make a fist with one hand and place it just above their navel.",
      "Grasp your fist with your other hand and pull inward and upward with quick jerks.",
      "Continue alternating between 5 back blows and 5 abdominal thrusts until the obstruction clears or emergency help arrives."
    ]
  },
  {
    id: "bleeding",
    title: "Severe Bleeding",
    tags: ["wound", "blood", "injury"],
    steps: [
      "Apply direct pressure to the wound using a clean cloth, gauze, or your hand if nothing else is available.",
      "If possible, raise the injured area above the level of the heart to reduce blood flow.",
      "Add more gauze or cloth if blood soaks through. Do not remove the original dressing.",
      "If bleeding continues severely, apply pressure to the relevant pressure point (artery against bone).",
      "Secure the dressing in place with a bandage when bleeding slows.",
      "If bleeding is life-threatening and does not stop with direct pressure, a tourniquet may be necessary as a last resort.",
      "Seek immediate medical attention."
    ]
  },
  {
    id: "burn",
    title: "Burns",
    tags: ["heat", "fire", "skin"],
    steps: [
      "Remove the person from the source of the burn.",
      "Cool the burn with cool (not cold) running water for at least 10 minutes.",
      "Do not apply ice directly to the burn as this can cause further damage.",
      "Remove jewelry, watches, and tight items from the burned area before swelling occurs.",
      "Cover the burn with a clean, dry bandage or cloth. Don't use fluffy cotton or adhesive bandages.",
      "Do not apply butter, oil, ointments, or creams to burns.",
      "For severe burns, call emergency services (911) immediately.",
      "Monitor for signs of shock (pale skin, weakness, rapid pulse) and treat accordingly."
    ]
  },
  {
    id: "fracture",
    title: "Fractures (Broken Bones)",
    tags: ["bone", "injury", "break"],
    steps: [
      "Call emergency services (911) for serious fractures.",
      "Keep the person still and calm. Do not move them unless absolutely necessary.",
      "If they must be moved, immobilize the injured area first.",
      "Apply ice packs wrapped in a cloth to reduce swelling and pain.",
      "For open fractures (bone piercing skin), do not push the bone back in. Cover the wound with a clean dressing.",
      "Immobilize the injured area using a splint. Extend the splint beyond the joints above and below the fracture.",
      "Secure the splint with bandages but don't tie them too tight.",
      "Check circulation beyond the injury regularly (feeling, warmth, color).",
      "Treat for shock if necessary by laying the person flat, elevating the legs if possible, and keeping them warm."
    ]
  }
];

const FirstAid = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeItem, setActiveItem] = useState<FirstAidItem | null>(null);
  
  const filteredItems = FIRST_AID_DATA.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen max-w-4xl mx-auto px-4 py-8 flex flex-col">
      <header className="mb-6 flex items-center gap-2">
        <Link to="/">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-semibold">First Aid Guide</h1>
      </header>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search first aid procedures..."
          className="pl-10 rounded-full h-12"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-6">
        {activeItem ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-sm border"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium">{activeItem.title}</h2>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setActiveItem(null)}
                className="text-muted-foreground"
              >
                Back to list
              </Button>
            </div>
            
            <ScrollArea className="h-[60vh] pr-4">
              <ol className="space-y-4">
                {activeItem.steps.map((step, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex gap-3"
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </span>
                    <p>{step}</p>
                  </motion.li>
                ))}
              </ol>
              
              <div className="mt-6 pt-4 border-t text-xs text-muted-foreground">
                <p>
                  <strong>Important:</strong> This guide is not a substitute for professional medical advice. 
                  Always call emergency services for serious conditions.
                </p>
              </div>
            </ScrollArea>
          </motion.div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => setActiveItem(item)}
                  className="bg-white rounded-xl p-5 shadow-sm border cursor-pointer hover:shadow-md transition-shadow"
                >
                  <h3 className="font-medium mb-2">{item.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map(tag => (
                      <span key={tag} className="bg-secondary px-2 py-1 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-2 text-center py-12 text-muted-foreground">
                No first aid procedures found for "{searchQuery}"
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FirstAid;
