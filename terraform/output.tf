output "app_service_name" {
  value = module.app_service.name
}

output "staging_slot_name" {
  value = module.app_service_slot_staging.name
}
//h