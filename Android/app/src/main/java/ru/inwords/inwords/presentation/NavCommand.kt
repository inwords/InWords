package ru.inwords.inwords.presentation

import androidx.annotation.IdRes
import androidx.navigation.NavController
import androidx.navigation.NavDirections
import androidx.navigation.NavGraph

interface NavCommand {
    fun perform(navController: NavController)
}

data class NavigateToGraphWithChangedStartDestinationCommand(val graphDirection: NavDirections, @IdRes val newStartDestination: Int) : NavCommand {
    override fun perform(navController: NavController) {
        val currentNode = navController.currentDestination ?: navController.graph

        val navAction = currentNode.getAction(graphDirection.actionId)

        if (navAction != null) {
            val graph = navController.graph.findNode(navAction.destinationId)
            if (graph is NavGraph) {
                graph.setStartDestination(newStartDestination)
            }
        }

        navController.navigate(graphDirection)
    }
}

data class NavigateToCommand(val direction: NavDirections) : NavCommand {
    override fun perform(navController: NavController) {
        navController.navigate(direction)
    }
}