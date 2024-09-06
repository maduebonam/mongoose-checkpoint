import dotenv from 'dotenv';
import dbConnection from "./db/conn.js";
import Person from './models/person.js';

dotenv.config();

// Establish the database connection
(async () => {
   try {
      await dbConnection();

      // Define personName
      const personName = 'John';

      // Create a new person
      const newPerson = new Person({
         name: 'John Doe',
         age: 30,
         favoriteFoods: ['Pizza', 'Burger'],
      });

      const savedPerson = await newPerson.save();
      console.log('Person saved:', savedPerson);

      // Create multiple records at once
      const arrayOfPeople = [
         { name: 'John', age: 25, favoriteFoods: ['Pizza', 'Pasta'] },
         { name: 'Jane', age: 22, favoriteFoods: ['Sushi', 'Tacos'] },
         { name: 'Doe', age: 28, favoriteFoods: ['Burger', 'Fries'] }
      ];

      const people = await Person.create(arrayOfPeople);
      console.log("Multiple people created:", people);

      // Find all people by a given name
      const peopleNamedJohn = await Person.find({ name: 'John' });
      console.log("People named John:", peopleNamedJohn);

      // Find one person by a specific favorite food
      const personWhoLikesPizza = await Person.findOne({ favoriteFoods: 'Pizza' });
      console.log("Person who likes Pizza:", personWhoLikesPizza);

      // Define a valid personId
      const personId = '66db4cd4157c296f3e5dfb6e';

      // Find a person by their _id
      const personById = await Person.findById(personId);
      console.log("Person found by ID:", personById);

      // Add "Hamburger" to favoriteFoods
      if (personById) {
         personById.favoriteFoods.push('Hamburger');
         const updatedPerson = await personById.save();
         console.log("Updated person:", updatedPerson);
      }

      // Update a person’s age by finding them by name
      const updatedPersonByName = await Person.findOneAndUpdate(
         { name: personName },
         { age: 20 },
         { new: true }
      );
      console.log("Updated person:", updatedPersonByName);

      // Remove a person by their _id
      const removedPerson = await Person.findByIdAndDelete(personId);
      console.log("Removed person:", removedPerson);

      // Delete all people with the name "Mary"
      const deleteResult = await Person.deleteMany({ name: 'Mary' });
      console.log("People named Mary deleted:", deleteResult);

      // Find people who like burritos, sort them by name, limit the results to 2, and hide their age
      const peopleWhoLikeBurritos = await Person.find({ favoriteFoods: 'Burritos' })
         .sort({ name: 1 })
         .limit(2)
         .select({ age: 0 });
      console.log("People who like burritos:", peopleWhoLikeBurritos);

   } catch (error) {
      console.error('Error:', error);
   }
})();