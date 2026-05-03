resource "azurerm_private_endpoint" "this" {
  name                = "pe-${var.target_resource_id}"
  location            = var.location
  resource_group_name = var.resource_group_name
  subnet_id           = var.subnet_id

  private_service_connection {
    name                           = "sql-connection"
    private_connection_resource_id = var.target_resource_id
    subresource_names              = ["sqlServer"]
    is_manual_connection           = false
  }
}

