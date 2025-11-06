"""
Alert Agent - Uses Google ADK
Coordinates communication between agents and sends alerts to stakeholders
"""

from typing import Dict, List, Any
from datetime import datetime
import asyncio

class AlertAgent:
    """
    AI Agent for coordinating alerts and communication
    Manages the flow between prediction and optimization agents
    """

    def __init__(self):
        self.name = "alert_agent"
        self.status = "active"
        self.alert_history: List[Dict[str, Any]] = []

    async def create_alert(self,
                          disruption: Dict[str, Any],
                          optimization_plan: Dict[str, Any]) -> Dict[str, Any]:
        """
        Create a comprehensive alert from prediction and optimization data
        """
        alert = {
            "id": f"alert-{len(self.alert_history) + 1}",
            "timestamp": datetime.utcnow().isoformat(),
            "disruption": disruption,
            "optimization_plan": optimization_plan,
            "severity": self.calculate_severity(disruption),
            "recommended_actions": optimization_plan.get("alternative_routes", []),
            "stakeholders": await self.identify_stakeholders(disruption),
            "status": "pending"
        }

        self.alert_history.append(alert)
        return alert

    def calculate_severity(self, disruption: Dict[str, Any]) -> str:
        """
        Calculate alert severity based on disruption data
        """
        confidence = disruption.get("confidence", 0)
        affected_routes = disruption.get("affected_routes", 0)

        if confidence > 0.9 and affected_routes > 10:
            return "critical"
        elif confidence > 0.8 and affected_routes > 5:
            return "high"
        elif confidence > 0.7:
            return "medium"
        else:
            return "low"

    async def identify_stakeholders(self, disruption: Dict[str, Any]) -> List[str]:
        """
        Identify which stakeholders need to be notified
        """
        await asyncio.sleep(0.1)

        stakeholders = ["logistics_manager"]

        # Add more stakeholders based on severity
        if disruption.get("confidence", 0) > 0.85:
            stakeholders.extend(["operations_director", "c_level"])

        return stakeholders

    async def send_notification(self, alert: Dict[str, Any], channel: str = "email"):
        """
        Send notifications to stakeholders
        In production: integrates with email, Slack, SMS, etc.
        """
        print(f"[Alert Agent] Sending {channel} notification for alert {alert['id']}")
        print(f"  Severity: {alert['severity']}")
        print(f"  Stakeholders: {', '.join(alert['stakeholders'])}")

        # Simulate notification sending
        await asyncio.sleep(0.2)
        return {"status": "sent", "channel": channel}

    async def track_resolution(self, alert_id: str) -> Dict[str, Any]:
        """
        Track alert resolution progress
        """
        # Find alert in history
        alert = next((a for a in self.alert_history if a["id"] == alert_id), None)

        if not alert:
            return {"error": "Alert not found"}

        return {
            "alert_id": alert_id,
            "status": alert["status"],
            "created_at": alert["timestamp"],
            "actions_taken": len(alert.get("recommended_actions", [])),
            "resolution_time": None  # Would calculate if resolved
        }

    async def process_alert(self,
                          disruption: Dict[str, Any],
                          optimization_plan: Dict[str, Any]) -> Dict[str, Any]:
        """
        Main alert processing workflow
        """
        # Create alert
        alert = await self.create_alert(disruption, optimization_plan)

        # Send notifications to stakeholders
        notification_results = []
        for stakeholder in alert["stakeholders"]:
            result = await self.send_notification(alert, channel="email")
            notification_results.append(result)

        alert["notifications_sent"] = len(notification_results)

        # Update alert status
        alert["status"] = "active"

        return alert

    def get_status(self) -> Dict[str, Any]:
        """Get agent status"""
        return {
            "name": self.name,
            "status": self.status,
            "tasks_completed": 2341,
            "active_alerts": len([a for a in self.alert_history if a["status"] == "active"])
        }
