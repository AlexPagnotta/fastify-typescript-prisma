import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

const Note = Type.Object({
  id: Type.Number(),
  title: Type.String(),
  text: Type.Optional(Type.String({})),
});

type Note = Static<typeof Note>;

const Notes = Type.Array(Note);

type Notes = Note[];

const CreateNoteInput = Type.Object({
  title: Type.String(),
  text: Type.Optional(Type.String({})),
});

type CreateNoteInput = Omit<Note, 'id'>;

const UpdateNoteInput = CreateNoteInput;

type UpdateNoteInput = CreateNoteInput;

const notes = async (fastify: FastifyInstance) => {
  fastify.get(
    '/notes',
    {
      schema: {
        response: {
          200: Notes,
        },
      },
    },
    async () => {
      return [
        {
          id: 1,
          title: 'Note Test',
          text: 'Note Note Note',
        },
        {
          id: 2,
          title: 'Note Test 2',
          text: 'Note Note Note 2',
        },
      ];
    },
  );

  fastify.get<{ Params: { id: number }; Response: Note }>(
    '/notes/:id',
    {
      schema: {
        params: Type.Object({
          id: Type.Number(),
        }),
        response: {
          200: Note,
        },
      },
    },
    async (req) => {
      const { id } = req.params;
      return {
        id: id,
        title: 'Note Test',
        text: 'Note Note Note',
      };
    },
  );

  fastify.post<{ Body: CreateNoteInput; Response: Note }>(
    '/notes',
    {
      schema: {
        body: CreateNoteInput,
        response: {
          200: Note,
        },
      },
    },
    async (req) => {
      const { title, text } = req.body;
      return {
        id: 1,
        title: title,
        text: text,
      };
    },
  );

  fastify.put<{ Params: { id: number }; Body: UpdateNoteInput; Response: Note }>(
    '/notes/:id',
    {
      schema: {
        params: Type.Object({
          id: Type.Number(),
        }),
        body: UpdateNoteInput,
        response: {
          200: Note,
        },
      },
    },
    async (req) => {
      const { id } = req.params;
      const { title, text } = req.body;
      return {
        id: id,
        title: title,
        text: text,
      };
    },
  );

  fastify.delete<{ Params: { id: number } }>(
    '/notes/:id',
    {
      schema: {
        params: Type.Object({
          id: Type.Number(),
        }),
        response: {
          200: Note,
        },
      },
    },
    async (req, reply) => {
      const { id } = req.params;
      console.log(`Deleted ${id}`);
      reply.code(204).send();
    },
  );
};

export default fp(notes);
