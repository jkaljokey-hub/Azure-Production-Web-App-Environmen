resource "azurerm_linux_web_app_slot" "this" {
  name           = var.slot_name
  app_service_id = var.app_service_id

  site_config {
    linux_fx_version = "NODE|20-lts"
  }
}

