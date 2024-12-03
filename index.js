class HotelReservationSystem {
  constructor() {
    this.rooms = [
      { type: "Single", sleeps: 1, count: 2, price: 30 },
      { type: "Double", sleeps: 2, count: 3, price: 50 },
      { type: "Family", sleeps: 4, count: 1, price: 85 },
    ];
  }

  findReservation(guests) {
    const validCombinations = this.findValidCombinations(guests);

    if (validCombinations.length === 0) {
      return "No option";
    }

    const cheapestCombo = validCombinations.reduce((cheapest, current) =>
      current.totalPrice < cheapest.totalPrice ? current : cheapest
    );

    return `${cheapestCombo.rooms.join(" ")} - $${cheapestCombo.totalPrice}`;
  }

  findValidCombinations(guests) {
    const validCombos = [];

    for (let single = 0; single <= this.rooms[0].count; single++) {
      for (let double = 0; double <= this.rooms[1].count; double++) {
        for (let family = 0; family <= this.rooms[2].count; family++) {
          const totalGuests =
            single * this.rooms[0].sleeps +
            double * this.rooms[1].sleeps +
            family * this.rooms[2].sleeps;

          const totalPrice =
            single * this.rooms[0].price +
            double * this.rooms[1].price +
            family * this.rooms[2].price;

          if (totalGuests === guests) {
            const rooms = [];
            if (single > 0) rooms.push(...Array(single).fill("Single"));
            if (double > 0) rooms.push(...Array(double).fill("Double"));
            if (family > 0) rooms.push(...Array(family).fill("Family"));

            validCombos.push({
              rooms: rooms,
              totalPrice: totalPrice,
            });
          }
        }
      }
    }

    return validCombos;
  }
}

function testReservationSystem() {
  const hotel = new HotelReservationSystem();

  console.log("Test Case 1 (2 guests):", hotel.findReservation(2));
  console.log("Test Case 2 (3 guests):", hotel.findReservation(3));
  console.log("Test Case 3 (6 guests):", hotel.findReservation(6));
  console.log("Test Case 4 (7 guests):", hotel.findReservation(7));
}

testReservationSystem();
