frappe.ui.form.on("Item", {
	refresh(frm) {
		if (!frm.doc.is_imported) {
			return;
		}

		frappe.call({
			method: "pricing_rule.discount_management.landed_cost.is_landed_cost_pricing_enabled",
		}).then((setting) => {
			if (!setting.message) {
				return;
			}

			frm.add_custom_button("Recalculate Selling Price", () => {
				frappe.call({
					method: "pricing_rule.discount_management.landed_cost.recalculate_for_item",
					args: { item_code: frm.doc.name },
				}).then((response) => {
					if (response.message) {
						frappe.msgprint(response.message);
					}
					frm.reload_doc();
				});
			});
		});
	},
});
