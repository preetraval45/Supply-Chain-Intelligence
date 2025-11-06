"""
Optimization Agent - Uses Google ADK
Receives disruption predictions and calculates optimal routes and inventory
"""

from typing import Dict, List, Any
import asyncio

class OptimizationAgent:
    """
    AI Agent for optimizing supply chain routes and inventory
    Uses graph algorithms and ML models to find optimal solutions
    """

    def __init__(self):
        self.name = "optimization_agent"
        self.status = "active"

    async def calculate_alternative_routes(self, affected_routes: List[str]) -> List[Dict[str, Any]]:
        """
        Calculate alternative routes when disruptions are predicted
        Uses graph algorithms to find optimal paths
        """
        # Simulate route calculation
        await asyncio.sleep(0.5)  # Simulate processing time

        alternatives = []
        for route_id in affected_routes:
            alternatives.append({
                "original_route": route_id,
                "alternative_route": f"{route_id}-alt",
                "additional_cost": 15000,
                "additional_time_hours": 8,
                "risk_reduction": 0.45
            })

        return alternatives

    async def optimize_inventory(self, affected_regions: List[str]) -> Dict[str, Any]:
        """
        Rebalance inventory across warehouses to mitigate disruption impact
        """
        await asyncio.sleep(0.3)

        return {
            "rebalancing_plan": [
                {
                    "from_warehouse": "Warehouse-A",
                    "to_warehouse": "Warehouse-B",
                    "items": 5000,
                    "estimated_cost": 25000
                }
            ],
            "buffer_increase": {
                "region": "West Coast",
                "additional_units": 10000,
                "cost": 150000
            }
        }

    async def calculate_optimization_score(self, plan: Dict[str, Any]) -> float:
        """
        Calculate optimization score based on cost, time, and risk
        """
        # Simplified scoring algorithm
        cost_score = 0.3
        time_score = 0.5
        risk_score = 0.2

        return (cost_score * 0.8) + (time_score * 0.9) + (risk_score * 0.95)

    async def optimize(self, prediction: Dict[str, Any]) -> Dict[str, Any]:
        """
        Main optimization workflow
        """
        affected_routes = prediction.get("affected_routes", [])
        affected_regions = prediction.get("affected_regions", [])

        # Calculate alternative routes
        alternative_routes = await self.calculate_alternative_routes(
            affected_routes if isinstance(affected_routes, list) else ["route-1", "route-2"]
        )

        # Optimize inventory
        inventory_plan = await self.optimize_inventory(
            affected_regions if isinstance(affected_regions, list) else ["west-coast"]
        )

        optimization_plan = {
            "alternative_routes": alternative_routes,
            "inventory_optimization": inventory_plan,
            "estimated_cost_savings": 450000,
            "estimated_time_savings_hours": 24
        }

        # Calculate score
        optimization_plan["optimization_score"] = await self.calculate_optimization_score(optimization_plan)

        # Send to Alert Agent
        await self.send_to_alert_agent(optimization_plan)

        return optimization_plan

    async def send_to_alert_agent(self, optimization_plan: Dict[str, Any]):
        """
        Send optimization results to Alert Agent
        """
        print(f"[Optimization Agent] Sending plan to Alert Agent: {optimization_plan}")
        # In production: await pubsub.publish("alert-topic", optimization_plan)

    def get_status(self) -> Dict[str, Any]:
        """Get agent status"""
        return {
            "name": self.name,
            "status": self.status,
            "tasks_completed": 892
        }
