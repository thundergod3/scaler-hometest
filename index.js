class HotelReservationSystem {
  constructor(roomTypes) {
    this.rooms = roomTypes;
  }

  findReservation(guests) {
    const combinations = this.generateCombinations(guests);

    if (combinations.length === 0) {
      return "No option";
    }

    const cheapestCombo = combinations.sort(
      (a, b) => a.totalPrice - b.totalPrice
    )[0];

    return `${cheapestCombo.roomTypes.join(" ")} - $${
      cheapestCombo.totalPrice
    }`;
  }

  generateCombinations(guests) {
    const validCombos = [];
    const roomTypes = Object.keys(this.rooms);

    const findCombinations = (currentCombo, currentGuests) => {
      if (currentGuests === guests) {
        const totalPrice = currentCombo.reduce(
          (sum, room) => sum + this.rooms[room].price,
          0
        );

        const roomCounts = roomTypes.reduce(
          (counts, type) => ({
            ...counts,
            [type]: currentCombo.filter((r) => r === type).length,
          }),
          {}
        );

        const isAvailable = roomTypes.every(
          (type) => roomCounts[type] <= this.rooms[type].rooms
        );

        if (isAvailable) {
          validCombos.push({
            roomTypes: currentCombo,
            totalPrice: totalPrice,
          });
        }
        return;
      }

      if (currentGuests > guests) {
        return;
      }

      for (let type of roomTypes) {
        findCombinations(
          [...currentCombo, type],
          currentGuests + this.rooms[type].capacity
        );
      }
    };

    findCombinations([], 0);
    return validCombos;
  }
}

const hotel = new HotelReservationSystem({
  Single: { capacity: 1, rooms: 2, price: 30 },
  Double: { capacity: 2, rooms: 3, price: 50 },
  Family: { capacity: 4, rooms: 1, price: 85 },
});

console.log(hotel.findReservation(2)); // Double - $50
console.log(hotel.findReservation(3)); // Single Double - $80
console.log(hotel.findReservation(4)); // Family - $85
