import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef(
  function TabsList({ className, ...props }, ref) {
    return (
      <TabsPrimitive.List ref={ref} className={cn("flex", className)} {...props} />
    );
  }
);
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef(
  function TabsTrigger({ className, ...props }, ref) {
    return (
      <TabsPrimitive.Trigger ref={ref} className={cn("px-4 py-2", className)} {...props} />
    );
  }
);
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef(
  function TabsContent({ className, ...props }, ref) {
    return (
      <TabsPrimitive.Content ref={ref} className={cn("p-4", className)} {...props} />
    );
  }
);
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }

