ALTER TABLE "work_areas" ADD COLUMN "is_active" boolean DEFAULT true NOT NULL;--> statement-breakpoint
CREATE INDEX "work_areas_name_idx" ON "work_areas" USING btree ("name");--> statement-breakpoint
CREATE INDEX "work_areas_scope_type_idx" ON "work_areas" USING btree ("scope_type");--> statement-breakpoint
CREATE INDEX "work_areas_is_active_idx" ON "work_areas" USING btree ("is_active");