/* eslint-disable react/prop-types */
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

const MobileDatePicker = ({ formData, setFormData, today, maxDate }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full">
      <label htmlFor="selectDate" className="text-sm font-medium">
        Preferred Appointment Date
      </label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start">
            {formData.selectDate ? format(new Date(formData.selectDate), "PPP") : "Select Date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={formData.selectDate ? new Date(formData.selectDate) : undefined}
            onSelect={(date) => {
              if (date) {
                setFormData({ ...formData, selectDate: date.toISOString().split("T")[0] });
                setOpen(false);
              }
            }}
            disabled={(date) => date < new Date(today) || date > new Date(maxDate)}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default MobileDatePicker;
