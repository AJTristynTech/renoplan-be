import { db } from '@configs/db';
import { users } from '@schema/user';
import { projects } from '@schema/project';
import { contracts } from '@schema/contracts';
import { workAreas } from '@schema/work-areas';
import { trades } from '@schema/trades';
import { workAreaTrade } from '@schema/work_area_trade';

async function seed() {
  console.log('Seeding database...');

  await db.transaction(async (tx) => {
    // Clear existing data in correct dependency order
    await tx.delete(workAreaTrade);
    await tx.delete(contracts);
    await tx.delete(projects);
    await tx.delete(trades);
    await tx.delete(workAreas);
    await tx.delete(users);

    // Seed users
    const createdUsers = await tx
      .insert(users)
      .values(
        Array.from({ length: 5 }).map((_, i) => ({
          firebase_uid: `firebase_uid_${i + 1}`,
          displayName: `User ${i + 1}`,
          email: `user${i + 1}@example.com`,
          user_type: i === 0 ? 'admin' : 'user',
        })),
      )
      .returning({ id: users.id });

    // Seed projects
    const projectTypes = [
      'home improvement',
      'renovation',
      'new construction',
      'other',
    ] as const;
    const createdProjects = await tx
      .insert(projects)
      .values(
        createdUsers.flatMap((u, index) => {
          const firstType = projectTypes[index % projectTypes.length];
          const secondType = projectTypes[(index + 1) % projectTypes.length];
          return [
            {
              user_id: u.id,
              title: `Project ${u.id}-A`,
              address: `${100 + u.id} Main St, Hometown`,
              duration: '3_months',
              project_type: firstType,
            },
            {
              user_id: u.id,
              title: `Project ${u.id}-B`,
              address: `${200 + u.id} Oak Ave, Hometown`,
              duration: '6_months',
              project_type: secondType,
            },
          ];
        }),
      )
      .returning({ id: projects.id });

    // Seed contracts
    await tx
      .insert(contracts)
      .values(
        createdProjects.flatMap((p, idx) => [
          { project_id: p.id, status: idx % 2 === 0 ? 'pending' : 'signed' },
        ]),
      );

    // Seed work areas (interior + exterior)
    const interiorWorkAreaNames: string[] = [
      'Kitchen',
      'Living Room',
      'Dining Room',
      'Master Bedroom',
      'Secondary Bedrooms',
      'Bathrooms (Master, Guest, Powder Room)',
      'Office / Study',
      'Basement / Rec Room',
      'Laundry Room',
      'Pantry / Storage',
      'Hallways / Entryways',
      'Attic / Loft',
      'Garage (Interior portion)',
    ];
    const exteriorWorkAreaNames: string[] = [
      'Roofing',
      'Siding / Cladding',
      'Windows & Doors (exterior)',
      'Deck / Patio',
      'Driveway / Walkways',
      'Landscaping / Yard',
      'Garage (Structure)',
      'Fencing & Gates',
      'Pool / Spa Area',
    ];

    const workAreaSeed: {
      name: string;
      description: string;
      scope_type: string;
    }[] = [
      ...interiorWorkAreaNames.map((name) => ({
        name,
        description: name,
        scope_type: 'interior',
      })),
      ...exteriorWorkAreaNames.map((name) => ({
        name,
        description: name,
        scope_type: 'exterior',
      })),
    ];
    const createdWorkAreas = await tx
      .insert(workAreas)
      .values(workAreaSeed)
      .returning({ id: workAreas.id, name: workAreas.name });

    // Seed trades (interior + exterior contract types)
    const interiorTradeNames: string[] = [
      'Interior Framing (Partition Walls, Bulkheads)',
      'HVAC Rough-In & Installation',
      'Plumbing Rough-In & Fixtures',
      'Electrical Rough-In & Fixtures',
      'Insulation (Wall, Ceiling, Soundproofing)',
      'Drywall & Taping',
      'Interior Doors & Trim Carpentry',
      'Millwork & Custom Cabinetry',
      'Tiling (Bathroom, Kitchen, Flooring)',
      'Flooring (Hardwood, Laminate, Vinyl, Carpet)',
      'Interior Painting & Wall Coverings',
      'Staircase & Handrail Installation',
      'Fireplace Installation (Gas/Wood/Electric)',
      'Smart Home Wiring & Systems (AV, Security)',
      'Closet Systems & Organizers',
      'Shower Glass & Mirror Installation',
      'Appliance Installation',
      'Final Plumbing & Electrical Connections',
      'Final HVAC Balancing & Thermostat Setup',
      'Final Cleaning & Touch-ups',
    ];
    const exteriorTradeNames: string[] = [
      'Excavation & Site Preparation',
      'Surveying & Site Engineering',
      'Forming & Concrete Foundation',
      'Waterproofing & Drainage',
      'Framing (Structural)',
      'Roofing (Shingles, Metal, Flat, etc.)',
      'Trusses & Roof Structure',
      'Masonry (Brick, Stone, Block)',
      'Siding (Vinyl, Wood, Composite)',
      'Stucco / EIFS',
      'Exterior Doors & Window Installation',
      'Garage Door Installation',
      'Eavestroughs / Soffits / Fascia',
      'Deck & Balcony Construction',
      'Exterior Painting / Finishes',
      'Driveway (Asphalt, Concrete, Pavers)',
      'Landscaping & Grading',
      'Fencing / Gates',
      'Septic System Installation (if applicable)',
      'Utility Hookups (Gas, Water, Electrical)',
      'Exterior Lighting & Electrical',
      'Irrigation System Installation',
    ];

    const uniqueTradeNames = Array.from(
      new Set<string>([...interiorTradeNames, ...exteriorTradeNames]),
    );
    const tradeSeed: { name: string }[] = uniqueTradeNames.map((name) => ({
      name,
    }));
    const createdTrades = await tx
      .insert(trades)
      .values(tradeSeed)
      .returning({ id: trades.id, name: trades.name });

    // Create map for quick lookup
    const workAreaNameToId = new Map(
      createdWorkAreas.map((wa) => [wa.name, wa.id]),
    );
    const tradeNameToId = new Map(createdTrades.map((t) => [t.name, t.id]));

    // Seed work_area_trade relationships: link interior areas to interior trades, exterior areas to exterior trades
    const interiorWorkAreaSet = new Set(interiorWorkAreaNames);
    const exteriorWorkAreaSet = new Set(exteriorWorkAreaNames);
    const interiorTradeSet = new Set(interiorTradeNames);
    const exteriorTradeSet = new Set(exteriorTradeNames);

    const workAreaTradeRows: { work_area_id: number; trade_id: number }[] = [];
    for (const [waName, waId] of workAreaNameToId.entries()) {
      const relevantTrades = interiorWorkAreaSet.has(waName)
        ? interiorTradeSet
        : exteriorWorkAreaSet.has(waName)
          ? exteriorTradeSet
          : new Set<string>();
      for (const tName of relevantTrades) {
        const tId = tradeNameToId.get(tName);
        if (typeof tId === 'number') {
          workAreaTradeRows.push({ work_area_id: waId, trade_id: tId });
        }
      }
    }

    if (workAreaTradeRows.length > 0) {
      await tx.insert(workAreaTrade).values(workAreaTradeRows);
    }
  });

  console.log('Seeding complete.');
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
