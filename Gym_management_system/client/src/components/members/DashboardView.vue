<template>
  <section>
    <div style="margin-bottom: 1.5rem; display: flex; justify-content: space-between">
      <div>
        <h1 class="welcome-text">Welcome <span class="tag">Back</span> <span class="username">Emily,</span></h1>
        <p class="text-muted-foreground">Here's an overview of your membership status and recent activities..</p>
      </div>

      <div
        style="
          background: #71717121;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 1rem;
          padding: 0 10px;
        "
        class="card_bg"
      >
        <Calendar1Icon />
        <span> 16 days left in your membership </span>
      </div>
    </div>

    <div class="card-section">
      <StatCard
        title="Membership Status"
        value="Premium"
        description="Active since Jan 2023"
        :icon="Users"
      />

      <StatCard title="Payment Due" value="$12,450" :icon="FileText" description="This month" />
    </div>

    <div style="" class="mid-section">
      <!-- Left Side - Receipt -->
      <aside style="flex: 1; padding: 1.5rem" class="card_bg">
        <div style="display: flex; justify-content: space-between; margin-bottom: 3rem">
          <div>
            <h1 class="card-title">
              Recent <br />
              Transactions
            </h1>
            <h4>Your payment history for the last 3 months</h4>
          </div>
          <button class="button card-link-btn">
            <RouterLink to="/dashboard/receipts" style="color: white"> View All</RouterLink>
          </button>
        </div>
        <RecentReceiptView />
      </aside>

      <!-- Right Side - Announcement -->
      <aside style="flex: 1; padding: 1.5rem" class="card_bg">
        <div style="display: flex; justify-content: space-between; margin-bottom: 3rem">
          <div>
            <h1 class="card-title">Recent Announcement</h1>
            <h4>Manage upcoming announcements for your members</h4>
          </div>
          <button class="button card-link-btn">
            <RouterLink to="/dashboard/notifications" style="color: white"> View All</RouterLink>
          </button>
        </div>
        <NotificationList :notifications="notifications" />
      </aside>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import StatCard from "../StatCard.vue";
import NotificationList from "./NotificationList.vue";
import RecentReceiptView from "./receipts/RecentReceiptView.vue";
import type { I_Notification } from "./NotificationList.vue";

import { Users, FileText, Calendar1Icon } from "lucide-vue-next";

const notifications: I_Notification[] = [
  {
    id: "not_123456",
    title: "Gym will be closed for maintenance",
    message: "The gym will be closed on Sunday, May 5th for scheduled maintenance.",
    notification_date: "2025-04-28",
    type: "general",
  },
  {
    id: "not_123457",
    title: "Your membership fee is due soon",
    message: "Your monthly membership fee of $49.99 is due on May 15, 2025.",
    notification_date: "2025-04-25",

    type: "payment",
  },
  {
    id: "not_123458",
    title: "Yoga class schedule updated",
    message: "The schedule for yoga classes has been updated for the month of May.",
    notification_date: "2025-04-20",

    type: "event",
  },
];
</script>

<style scoped>
section {
  width: 100%;
  padding: 0 2rem;
}

.card-section {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-bottom: 2rem;
}
.card-link-btn {
  width: 9rem;
  height: 3rem;
  padding: 0;
  display: block;
}
.mid-section{
    display: flex; gap: 1rem; width: 100%; margin-bottom: 2rem;
}
@media (width >= 48rem) {
  .card-section {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .mid-section {
    flex-direction: column;
  }
}
</style>
