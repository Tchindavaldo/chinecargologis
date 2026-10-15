// Demo mode fixtures: fictitious, realistic data (China -> Cameroon / Central & West Africa).
// No real customer data. Used only when VITE_DEMO=1.

export const DEMO_ADMIN = { email: 'admin@demo.chinecargologis.test', password: 'demo1234', id: 'demo-admin-0001' };

const T = Date.now();
const day = 86400000;
const iso = (d: number) => new Date(T - d * day).toISOString();
const date = (d: number) => new Date(T - d * day).toISOString().slice(0, 10);

type Row = Record<string, unknown>;

const people = [
  ['Guangzhou Huatai Trading Co.', '+86 20 8392 1145', 'Baiyun District, Guangzhou, China'],
  ['Yiwu Starlight Commodities', '+86 579 8551 2290', 'Futian Market, Yiwu, Zhejiang, China'],
  ['Shenzhen Lumen Electronics', '+86 755 2661 8803', 'Huaqiangbei, Shenzhen, China'],
  ['Foshan Golden Tile Factory', '+86 757 8277 4410', 'Nanzhuang, Foshan, Guangdong, China'],
  ['Shanghai Orient Machinery', '+86 21 5866 3017', 'Pudong, Shanghai, China'],
  ['Ningbo Bluewave Textiles', '+86 574 8730 6624', 'Yinzhou, Ningbo, China'],
];
const receivers = [
  ['Ets. Mbarga & Fils', '+237 677 41 22 85', 'Marche Mokolo, Yaounde, Cameroon'],
  ['Ngo Biyong Aline', '+237 699 18 47 30', 'Akwa, Douala, Cameroon'],
  ['Fotso Distribution SARL', '+237 655 90 13 62', 'Bonaberi, Douala, Cameroon'],
  ['Tchoupo Electro Shop', '+237 680 33 71 09', 'Bafoussam, Cameroon'],
  ['Hamadou Bello', '+237 691 25 64 88', 'Garoua, Cameroon'],
  ['Mvondo Construction', '+237 670 52 18 44', 'Bastos, Yaounde, Cameroon'],
  ['Okafor Imports Ltd', '+234 803 412 7765', 'Lagos, Nigeria'],
  ['Boutique Ndong', '+241 66 21 48 90', 'Libreville, Gabon'],
  ['Kouassi Mode', '+225 07 58 33 12 41', 'Abidjan, Cote d\'Ivoire'],
];
const goods = [
  ['Smartphones & accessories', 'Electronics', '12 cartons', 'Air'],
  ['Floor tiles 60x60', 'Building materials', '1 x 20ft container', 'Sea'],
  ['Wax fabric rolls', 'Textiles', '40 bales', 'Sea'],
  ['Solar panels 450W', 'Energy', '64 panels', 'Sea'],
  ['Hair extensions', 'Beauty', '6 cartons', 'Air'],
  ['Motorcycle spare parts', 'Automotive', '22 cartons', 'Sea'],
  ['Laptops (refurbished)', 'Electronics', '8 cartons', 'Air'],
  ['Kitchen appliances', 'Household', '1 x 40ft container', 'Sea'],
  ['Pharmacy packaging', 'Packaging', '30 cartons', 'Air'],
  ['Generator 15 kVA', 'Machinery', '2 crates', 'Sea'],
];
const stages: [string, string, number][] = [
  ['picked_up', 'Collected at Guangzhou warehouse', 15],
  ['in_transit', 'In transit - departed Shenzhen (Yantian)', 45],
  ['in_transit', 'In transit - transshipment Port Klang', 55],
  ['customs', 'Customs clearance - Port of Douala', 75],
  ['out_for_delivery', 'Out for delivery - Douala', 90],
  ['delivered', 'Delivered', 100],
];

export function buildShipments(): Row[] {
  const rows: Row[] = [];
  for (let i = 0; i < 24; i++) {
    const s = people[i % people.length];
    const r = receivers[(i * 5) % receivers.length];
    const g = goods[(i * 3) % goods.length];
    const st = stages[i < 4 ? (i % 3) : (i * 7) % stages.length];
    const air = g[3] === 'Air';
    const kg = air ? 40 + ((i * 37) % 260) : 1800 + ((i * 911) % 14000);
    const fcfa = air ? kg * 9500 : Math.round(kg * 310 / 1000) * 1000 + 450000;
    const age = i * 2 + 1;
    const dest = r[2].split(', ').slice(-2).join(', ');
    rows.push({
      id: `demo-shp-${String(i + 1).padStart(3, '0')}`,
      tracking_number: `CCL${(26100 + i * 37).toString()}${air ? 'A' : 'S'}`,
      status: st[1],
      tracking_stage: st[0],
      tracking_progress: st[2],
      origin: s[2].split(', ').slice(-2).join(', ').replace(', China', ', China'),
      destination: dest,
      carrier: air ? ['Ethiopian Cargo', 'Turkish Cargo', 'Emirates SkyCargo'][i % 3] : ['CMA CGM', 'MSC', 'COSCO Shipping'][i % 3],
      carrier_reference: air ? `071-${4410200 + i * 13}` : `MEDU${7200300 + i * 41}`,
      product: g[0],
      type_of_shipment: g[1],
      quantity: parseInt(g[2]) || 1,
      weight: `${kg} kg`,
      payment_mode: ['Mobile Money (MTN)', 'Orange Money', 'Bank transfer', 'Cash - Douala office'][i % 4],
      shipment_mode: air ? 'Air freight' : 'Sea freight (LCL/FCL)',
      total_freight: `${fcfa.toLocaleString('fr-FR')} FCFA (~${Math.round(fcfa / 600).toLocaleString('en-US')} USD)`,
      expected_delivery_date: date(age - (air ? 10 : 45)),
      departure_date: date(age),
      departure_time: '14:30',
      delivery_time: '10:00',
      package_description: `${g[2]} - ${g[0]}`,
      shipper_name: s[0], shipper_phone: s[1], shipper_email: `export@${s[0].split(' ')[0].toLowerCase()}-demo.test`, shipper_address: s[2],
      receiver_name: r[0], receiver_phone: r[1], receiver_email: `${r[0].split(' ')[0].toLowerCase().replace('.', '')}@demo.test`, receiver_address: r[2],
      comment: i % 5 === 0 ? 'Fragile - handle with care' : '',
      image_url: '',
      insurances: i % 3 === 0 ? [{ name: 'Cargo insurance (1.5%)', amount: `${Math.round(fcfa * 0.015).toLocaleString('fr-FR')} FCFA`, paid: i % 2 === 0 }] : [],
      import_tax: `${Math.round(fcfa * 0.18).toLocaleString('fr-FR')} FCFA`,
      import_tax_paid: st[0] === 'delivered' || st[0] === 'out_for_delivery',
      status_date: date(Math.max(0, age - 3)),
      status_time: '09:15',
      created_at: iso(age),
      updated_at: iso(Math.max(0, age - 3)),
    });
  }
  return rows;
}

export function buildUsers(): Row[] {
  const list: Row[] = [{ id: 'demo-u-0', user_id: DEMO_ADMIN.id, email: DEMO_ADMIN.email, role: 'admin', active: true, created_at: iso(120), updated_at: iso(120) }];
  ['ops.douala', 'mbarga.fils', 'aline.ngobiyong', 'fotso.distribution', 'tchoupo.electro', 'h.bello', 'okafor.imports', 'kouassi.mode'].forEach((n, i) =>
    list.push({ id: `demo-u-${i + 1}`, user_id: i === 0 ? 'demo-ops' : null, email: `${n}@demo.test`, role: i === 0 ? 'admin' : 'client', active: i !== 6, created_at: iso(110 - i * 9), updated_at: iso(100 - i * 9) }));
  return list;
}

export function buildSettings(): Row[] {
  return [{
    id: 'demo-settings-1',
    company_name: 'Chine Cargo Logis (Demo)',
    company_description: 'Air and sea freight from China to Cameroon and Central/West Africa: sourcing, consolidation, customs clearance and door delivery.',
    site_email: 'contact@demo.chinecargologis.test',
    support_email: 'support@demo.chinecargologis.test',
    site_phone: '+237 6XX XX XX XX',
    site_address: 'Akwa, Douala, Cameroon - Guangzhou, China',
    created_at: iso(200), updated_at: iso(5),
  }];
}
